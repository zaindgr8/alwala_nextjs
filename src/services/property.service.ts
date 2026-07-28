import { prisma } from "@/lib/prisma";
import { Prisma, Property, PropertyType, PropertyStatus } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

// Read-only Supabase client for public property reads (respects RLS via the
// publishable key). No session persistence — this runs server-side per request.
const supabaseRead = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false } }
);

// Pulls every property column plus the related community/agent/metrics, matching
// the shape the Prisma `include` used to return so the UI mapping is unchanged.
const PROPERTY_SELECT =
  "*,community:communities(*),agent:agents(*),metrics:investment_metrics(*)";

export interface PropertyFilters {
  type?: PropertyType;
  status?: PropertyStatus;
  communityId?: string;
  communitySlug?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export const propertyService = {
  // Public property listing — reads directly from Supabase (no Prisma/Postgres
  // driver), keeping the same filters and return shape the API/UI expect.
  async getAll(filters: PropertyFilters = {}) {
    const { type, status, communityId, communitySlug, featured, minPrice, maxPrice, search } = filters;

    // `!inner` is only needed when we filter on the embedded community.
    const select = communitySlug
      ? PROPERTY_SELECT.replace("communities(*)", "communities!inner(*)")
      : PROPERTY_SELECT;

    let query = supabaseRead
      .from("properties")
      .select(select)
      .order("createdAt", { ascending: false });

    if (type) query = query.eq("type", type);
    if (status) query = query.eq("status", status);
    if (communityId) query = query.eq("communityId", communityId);
    if (communitySlug) query = query.eq("community.slug", communitySlug);
    if (featured !== undefined) query = query.eq("featured", featured);
    if (minPrice) query = query.gte("price", minPrice);
    if (maxPrice) query = query.lte("price", maxPrice);
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getPaginated(filters: PropertyFilters = {}, page = 1, pageSize = 20) {
    const { type, status, communityId, communitySlug, featured, minPrice, maxPrice, search } = filters;

    const where: Prisma.PropertyWhereInput = {
      ...(type && { type }),
      ...(status && { status }),
      ...(communityId && { communityId }),
      ...(communitySlug && { community: { slug: communitySlug } }),
      ...(featured !== undefined && { featured }),
      ...(minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      },
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // Clamp inputs so a bad query param can't request a huge page or a negative skip.
    const safePage = Math.max(1, Math.floor(page) || 1);
    const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize) || 20));

    const [data, total] = await prisma.$transaction([
      prisma.property.findMany({
        where,
        include: {
          community: true,
          agent: true,
          metrics: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (safePage - 1) * safePageSize,
        take: safePageSize,
      }),
      prisma.property.count({ where }),
    ]);

    return {
      data,
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages: Math.max(1, Math.ceil(total / safePageSize)),
    };
  },

  async getById(id: string) {
    return await prisma.property.findUnique({
      where: { id },
      include: {
        community: true,
        agent: true,
        metrics: true,
      },
    });
  },

  async create(data: Prisma.PropertyUncheckedCreateInput) {
    return await prisma.property.create({
      data,
    });
  },

  async update(id: string, data: Prisma.PropertyUpdateInput) {
    return await prisma.property.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.property.delete({
      where: { id },
    });
  },

  async duplicate(id: string) {
    const original = await this.getById(id);
    if (!original) throw new Error("Property not found");

    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, community: _community, agent: _agent, metrics: _metrics, coordinates, ...rest } = original;

    return await prisma.property.create({
      data: {
        ...rest,
        coordinates: coordinates as any,
        slug: `${rest.slug}-copy-${Date.now()}`,
        communityId: original.communityId,
        agentId: original.agentId,
      },
    });
  },
};
