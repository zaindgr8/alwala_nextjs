import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // For middleware checks, userId is passed in body
    // For client-side checks, we rely on the session cookie
    const body = await request.json().catch(() => ({}));
    let userId = body.userId;

    if (!userId) {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session')?.value;
      if (sessionCookie) {
        const decrypted = await decrypt(sessionCookie);
        userId = decrypted.userId;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('isActive, role')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!user || !user.isActive) {
      return NextResponse.json({ active: false }, { status: 403 });
    }

    return NextResponse.json({
      active: true,
      session: { userId, role: user.role }
    });
  } catch (error) {
    console.error('[CHECK_SESSION]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
