import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyPassword } from '@/lib/password';

export async function POST(request: Request) {
  const startTime = Date.now();
  try {
    const { username, password } = await request.json();
    const email = username;

    const dbStart = Date.now();
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, passwordHash, role, status, isActive')
      .eq('email', email)
      .maybeSingle();
    const dbEnd = Date.now();
    console.log(`[AUTH_LOGIN] DB Fetch: ${dbEnd - dbStart}ms`);

    if (userError) throw userError;
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const pwdStart = Date.now();
    const isValid = await verifyPassword(password, user.passwordHash);
    const pwdEnd = Date.now();
    console.log(`[AUTH_LOGIN] Password Verify: ${pwdEnd - pwdStart}ms`);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (user.status !== 'APPROVED' || !user.isActive) {
      return NextResponse.json(
        { error: 'Account is not active or is pending approval' },
        { status: 403 }
      );
    }

    const sessionStart = Date.now();
    const session = await encrypt({
      userId: user.id,
      role: user.role
    });
    const sessionEnd = Date.now();
    console.log(`[AUTH_LOGIN] Session Gen: ${sessionEnd - sessionStart}ms`);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    const totalTime = Date.now() - startTime;
    console.log(`[AUTH_LOGIN] Total Response Time: ${totalTime}ms`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[AUTH_LOGIN]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
