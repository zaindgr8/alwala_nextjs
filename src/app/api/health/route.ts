import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  const start = Date.now();
  try {
    // Lightweight round-trip to confirm the DB is reachable.
    const { error } = await supabaseAdmin
      .from('communities')
      .select('id', { count: 'exact', head: true });
    if (error) throw error;
    const duration = Date.now() - start;
    return NextResponse.json({
      status: 'ok',
      latency: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}
