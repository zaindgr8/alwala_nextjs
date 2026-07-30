import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await decrypt(session);
    if (payload.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Super Admin only' }, { status: 403 });
    }

    const { status, isActive } = await request.json();

    // `updatedAt` is NOT NULL with no DB default — always bump it on update.
    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };
    if (status !== undefined) updateData.status = status;
    if (isActive !== undefined) updateData.isActive = isActive;

    const { data: updatedUser, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[UPDATE_USER]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
