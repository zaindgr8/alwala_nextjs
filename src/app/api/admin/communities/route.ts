import { NextResponse } from 'next/server';
import { communityService } from '@/services/community.service';
import { z } from 'zod';

const communitySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  location: z.string(),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    // TODO: Add auth check (Task 5)
    const body = await request.json();
    const validatedData = communitySchema.parse(body);
    // Community.id has no DB default; mirror the seed convention of id === slug.
    const community = await communityService.create({ ...validatedData, id: validatedData.slug });
    return NextResponse.json(community);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    // Postgres unique-violation (duplicate slug/id)
    if ((error as { code?: string })?.code === '23505') {
      return NextResponse.json({
        error: 'A community with this slug already exists',
      }, { status: 400 });
    }
    console.error('[ADMIN_COMMUNITIES_POST]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // TODO: Add auth check (Task 5)
    const communities = await communityService.getAll();
    return NextResponse.json(communities);
  } catch (error) {
    console.error('[ADMIN_COMMUNITIES_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
