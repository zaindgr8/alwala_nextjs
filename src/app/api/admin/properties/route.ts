import { NextResponse } from 'next/server';
import { propertyService } from '@/services/property.service';
import { z } from 'zod';
import { PropertyType, PropertyStatus } from '@/types/db';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { generateSlug } from '@/lib/slugs';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

const propertySchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  type: z.nativeEnum(PropertyType),
  status: z.nativeEnum(PropertyStatus),
  city: z.string().min(1, "City is required"),
  location: z.string().min(1, "Location is required"),
  communityId: z.string().min(1, "Community is required"), // Accepts slug
  price: z.coerce.number().positive("Price must be positive"),
  currency: z.string().default('OMR'),
  bedrooms: z.coerce.number().nullable().optional(),
  bathrooms: z.coerce.number().nullable().optional(),
  areaSqm: z.coerce.number().nullable().optional(),
  gallery: z.array(z.string()).default([]),
  bannerImageUrl: z.string().optional(),
  amenities: z.array(z.string()).default([]),
  coordinates: z.any().optional(),
  featured: z.coerce.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    // 1. Identify the logged-in user from the session cookie.
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await decrypt(session);
    const userId = payload.userId as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = propertySchema.parse(body);

    // 2. Resolve Community Slug to ID
    const { data: community } = await supabaseAdmin
      .from('communities')
      .select('id')
      .eq('slug', validatedData.communityId)
      .maybeSingle();
    if (!community) {
      return NextResponse.json({ error: 'Invalid community slug' }, { status: 400 });
    }

    // 3. The property is always assigned to the agent profile of the
    // logged-in user, so agents/admins never pick from a list.
    const { data: agent } = await supabaseAdmin
      .from('agents')
      .select('id')
      .eq('userId', userId)
      .maybeSingle();
    if (!agent) {
      return NextResponse.json(
        { error: 'Your account has no agent profile, so it cannot own listings.' },
        { status: 400 }
      );
    }

    // 4. Auto-generate slug from title
    const slug = generateSlug(validatedData.title);

    const property = await propertyService.create({
      ...validatedData,
      slug,
      communityId: community.id,
      agentId: agent.id,
    });

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[ADMIN_PROPERTIES_POST_VALIDATION_ERROR]', error.issues);
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map(i => `${i.path.join('.')}: ${i.message}`)
      }, { status: 400 });
    }
    // Postgres unique-violation (e.g. duplicate slug)
    if ((error as { code?: string })?.code === '23505') {
      return NextResponse.json({
        error: 'A property with this slug already exists',
      }, { status: 400 });
    }
    console.error('[ADMIN_PROPERTIES_POST]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // TODO: Add auth check (Task 5)
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 20;
    const search = searchParams.get('search') || undefined;

    const result = await propertyService.getPaginated({ search }, page, pageSize);
    console.log(
      `[ADMIN_PROPERTIES_GET] Returning page ${result.page}/${result.totalPages} (${result.data.length} of ${result.total})`
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error('[ADMIN_PROPERTIES_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
