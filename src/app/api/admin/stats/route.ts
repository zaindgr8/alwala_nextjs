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
    if (payload.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // head+count returns only the row count, no rows.
    const [users, properties, communities] = await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('properties').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('communities').select('*', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      agents: users.count ?? 0,
      properties: properties.count ?? 0,
      communities: communities.count ?? 0,
      health: '99.9%', // Static for now as we don't have a real health check
    });
  } catch (error) {
    console.error('[GET_ADMIN_STATS]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
