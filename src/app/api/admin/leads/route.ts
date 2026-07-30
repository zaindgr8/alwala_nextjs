import { NextResponse } from 'next/server';
import { leadService } from '@/services/lead.service';
import { pushLeadToLeadrat } from '@/services/leadrat.service';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  propertyId: z.string().uuid().optional(),
  message: z.string(),
});

export async function POST(request: Request) {
  try {
    // Public endpoint for user submissions
    const body = await request.json();
    const validatedData = leadSchema.parse(body);
    const lead = await leadService.create(validatedData);

    // Forward to Leadrat CRM (PUSH). Non-fatal: pushLeadToLeadrat swallows its
    // own errors so a CRM outage never fails the customer's submission.
    await pushLeadToLeadrat({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      propertyId: validatedData.propertyId,
    });

    return NextResponse.json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('[LEADS_POST]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // TODO: Add auth check (Task 5)
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get('status') as any,
      search: searchParams.get('search') || undefined,
    };
    const leads = await leadService.getAll(filters);
    return NextResponse.json(leads);
  } catch (error) {
    console.error('[ADMIN_LEADS_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
