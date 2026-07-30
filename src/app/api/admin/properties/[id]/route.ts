import { NextResponse } from 'next/server';
import { propertyService } from '@/services/property.service';
import { z } from 'zod';
import { PropertyType, PropertyStatus } from '@/types/db';

// Treat empty string / null / undefined as null so nullable numeric fields
// don't get coerced to 0.
const emptyToNull = (v: unknown) =>
  v === '' || v === null || v === undefined ? null : v;

const propertyUpdateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(PropertyType).optional(),
  status: z.nativeEnum(PropertyStatus).optional(),
  city: z.string().optional(),
  location: z.string().optional(),
  // Community/agent IDs are human-readable slugs (e.g. "al-mouj", "super-admin"),
  // not UUIDs — validating them as UUIDs rejected every valid update.
  communityId: z.string().min(1).optional(),
  agentId: z.string().min(1).optional(),
  price: z.coerce.number().optional(),
  currency: z.string().optional(),
  // Nullable in the DB. Empty string / null / undefined mean "no value" and must
  // stay null — plain z.coerce.number() would turn them into 0 (Number(null) === 0)
  // and silently corrupt the record.
  bedrooms: z.preprocess(emptyToNull, z.coerce.number().nullable()).optional(),
  bathrooms: z.preprocess(emptyToNull, z.coerce.number().nullable()).optional(),
  areaSqm: z.coerce.number().optional(),
  gallery: z.array(z.string()).optional(),
  bannerImageUrl: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  coordinates: z.any().optional(),
  featured: z.coerce.boolean().optional(),
}).partial();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // TODO: Add auth check (Task 5)
    const { id } = await params;
    const body = await request.json();
    const validatedData = propertyUpdateSchema.parse(body);

    const property = await propertyService.update(id, validatedData);

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('[ADMIN_PROPERTIES_PATCH]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // TODO: Add auth check (Task 5)
    const { id } = await params;
    await propertyService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ADMIN_PROPERTIES_DELETE]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // TODO: Add auth check (Task 5)
    const { id } = await params;
    const property = await propertyService.getById(id);
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error('[ADMIN_PROPERTIES_GET_ID]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
