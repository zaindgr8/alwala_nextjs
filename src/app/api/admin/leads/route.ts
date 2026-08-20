import { NextResponse } from 'next/server';
import { leadService } from '@/services/lead.service';
import { pushLeadToLeadrat } from '@/services/leadrat.service';
import { forwardLeadToWebhook } from '@/services/webhook.service';
import { formatFullPhone } from '@/lib/country-codes';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  budget: z.string().optional(),
  propertyId: z.string().uuid().optional(),
  message: z.string().optional().default(''),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    // Normalize phone number to guarantee '+' sign and country code (e.g. "+968 91234567" or "+91 3348945693")
    const formattedPhone = formatFullPhone(validatedData.phone);

    const leadInput = {
      name: validatedData.name,
      email: validatedData.email,
      phone: formattedPhone,
      message: validatedData.message || (validatedData.budget ? `Budget: ${validatedData.budget}` : ''),
      propertyId: validatedData.propertyId,
    };

    let savedLead = null;
    try {
      // Save lead in Supabase database
      savedLead = await leadService.create(leadInput);
    } catch (dbError) {
      console.warn('[LEADS_POST] Database insert failed (check Supabase connection):', dbError);
    }

    // Forward to Leadrat CRM (PUSH). Non-fatal.
    try {
      await pushLeadToLeadrat(leadInput);
    } catch (crmError) {
      console.warn('[LEADS_POST] Leadrat push failed:', crmError);
    }

    // Forward to any configured Webhooks (Zapier, Make, custom webhooks). Non-fatal.
    try {
      await forwardLeadToWebhook({
        ...leadInput,
        budget: validatedData.budget,
      });
    } catch (webhookError) {
      console.warn('[LEADS_POST] Webhook forward failed:', webhookError);
    }

    return NextResponse.json(savedLead || { success: true, lead: leadInput }, { status: 200 });
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
