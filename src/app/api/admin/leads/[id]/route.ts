import { NextResponse } from 'next/server';
import { leadService } from '@/services/lead.service';
import { LeadStatus } from '@/types/db';
import { z } from 'zod';

const leadUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus),
}).partial();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // TODO: Add auth check (Task 5)
    const { id } = await params;
    const body = await request.json();
    const validatedData = leadUpdateSchema.parse(body);

    if (validatedData.status) {
      await leadService.updateStatus(id, validatedData.status);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('[ADMIN_LEADS_PATCH]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // TODO: Add auth check (Task 5)
    const { id } = await params;
    await leadService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ADMIN_LEADS_DELETE]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
