import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await decrypt(session);
    // Allow both SUPER_ADMIN and ADMIN to access metadata for listing creation
    if (payload.role !== 'SUPER_ADMIN' && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [communitiesRes, agentsRes] = await Promise.all([
      supabaseAdmin
        .from('communities')
        .select('id, name, slug')
        .order('name', { ascending: true }),
      supabaseAdmin
        .from('agents')
        .select('id, fullName, slug')
        .eq('isActive', true)
        .order('fullName', { ascending: true }),
    ]);
    if (communitiesRes.error) throw communitiesRes.error;
    if (agentsRes.error) throw agentsRes.error;

    return NextResponse.json({
      communities: communitiesRes.data ?? [],
      agents: agentsRes.data ?? [],
    });
  } catch (error) {
    console.error('[GET_LISTING_METADATA]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
