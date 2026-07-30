import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { generateSlug } from '@/lib/slugs';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await decrypt(session);
    if (payload.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Super Admin only' }, { status: 403 });
    }

    // Never expose passwordHash — select explicit columns only.
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(
        'id, email, role, status, isActive, createdAt, updatedAt, agent:agents(*, properties(count))'
      )
      .order('createdAt', { ascending: false });
    if (error) throw error;

    // Reshape Supabase's `agent.properties: [{ count }]` into the Prisma-style
    // `agent._count.properties` the admin UI expects.
    const users = (data ?? []).map((u: Record<string, unknown>) => {
      const agent = u.agent as Record<string, unknown> | null;
      if (agent) {
        const propsCount = Array.isArray(agent.properties)
          ? ((agent.properties[0] as { count?: number })?.count ?? 0)
          : 0;
        const { properties: _p, ...agentRest } = agent;
        u.agent = { ...agentRest, _count: { properties: propsCount } };
      }
      return u;
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('[GET_USERS]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await decrypt(session);
    if (payload.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Super Admin only' }, { status: 403 });
    }

    const { email, password, fullName, phone, bio, role, status } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 12);

    // Agent.id and Agent.slug have no DB default, so generate them here.
    // Suffix the slug with a short unique fragment to avoid slug collisions
    // when two agents share the same full name.
    const agentId = randomUUID();
    const slug = `${generateSlug(fullName)}-${agentId.slice(0, 8)}`;

    // Supabase-js has no client-side transaction, so insert the user first,
    // then the agent, and roll the user back if the agent insert fails.
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        passwordHash,
        role: role || 'AGENT',
        status: status || 'PENDING',
        isActive: true,
        // `updatedAt` is NOT NULL with no DB default (Prisma used to set it via
        // @updatedAt), so we must provide it explicitly.
        updatedAt: new Date().toISOString(),
      })
      .select('*')
      .single();
    if (userError) throw userError;

    const { data: agent, error: agentError } = await supabaseAdmin
      .from('agents')
      .insert({
        id: agentId,
        slug,
        userId: user.id,
        fullName,
        phone: phone || '',
        bio,
        isActive: true,
      })
      .select('*')
      .single();

    if (agentError) {
      // Compensating rollback — remove the orphaned user.
      await supabaseAdmin.from('users').delete().eq('id', user.id);
      throw agentError;
    }

    return NextResponse.json({ user, agent });
  } catch (error) {
    // Postgres unique-violation (duplicate email)
    if ((error as { code?: string })?.code === '23505') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      );
    }
    console.error('[CREATE_USER]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
