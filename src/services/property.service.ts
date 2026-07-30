import { PropertyType, PropertyStatus } from "@/types/db";
import { supabaseRead } from "@/lib/supabase-read";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Admin select (service-role, bypasses RLS): full row + community/agent/metrics,
// matching the shape the Prisma `include` used to return.
const PROPERTY_SELECT =
  "*,community:communities(*),agent:agents(*),metrics:investment_metrics(*)";

// Public select (anon key): omit the `agents` embed so the public listing does
// not depend on anon read access to agent PII — agent data is unused publicly.
const PUBLIC_PROPERTY_SELECT =
  "*,community:communities(*),metrics:investment_metrics(*)";

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
      ? PUBLIC_PROPERTY_SELECT.replace("communities(*)", "communities!inner(*)")
      : PUBLIC_PROPERTY_SELECT;

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

  // Admin paginated listing (bypasses RLS via the service-role client).
  async getPaginated(filters: PropertyFilters = {}, page = 1, pageSize = 20) {
    const { type, status, communityId, communitySlug, featured, minPrice, maxPrice, search } = filters;

    // Clamp inputs so a bad query param can't request a huge page or a negative skip.
    const safePage = Math.max(1, Math.floor(page) || 1);
    const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize) || 20));
    const from = (safePage - 1) * safePageSize;
    const to = from + safePageSize - 1;

    const select = communitySlug
      ? PROPERTY_SELECT.replace("communities(*)", "communities!inner(*)")
      : PROPERTY_SELECT;

    let query = supabaseAdmin
      .from("properties")
      .select(select, { count: "exact" })
      .order("createdAt", { ascending: false })
      .range(from, to);

    if (type) query = query.eq("type", type);
    if (status) query = query.eq("status", status);
    if (communityId) query = query.eq("communityId", communityId);
    if (communitySlug) query = query.eq("community.slug", communitySlug);
    if (featured !== undefined) query = query.eq("featured", featured);
    if (minPrice) query = query.gte("price", minPrice);
    if (maxPrice) query = query.lte("price", maxPrice);
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,slug.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { data, count, error } = await query;
    if (error) throw error;

    const total = count ?? 0;
    return {
      data: data ?? [],
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages: Math.max(1, Math.ceil(total / safePageSize)),
    };
  },

  async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async create(data: Record<string, unknown>) {
    const { data: row, error } = await supabaseAdmin
      .from("properties")
      .insert(data)
      .select(PROPERTY_SELECT)
      .single();
    if (error) throw error;
    return row;
  },

  async update(id: string, data: Record<string, unknown>) {
    const { data: row, error } = await supabaseAdmin
      .from("properties")
      // Bump updatedAt on every edit (Prisma used to do this via @updatedAt).
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select(PROPERTY_SELECT)
      .single();
    if (error) throw error;
    return row;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("properties")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return { id };
  },

  async duplicate(id: string) {
    const original = await this.getById(id);
    if (!original) throw new Error("Property not found");

    // Strip identity/timestamp/relational fields; keep the raw column values.
    const {
      id: _id,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      community: _community,
      agent: _agent,
      metrics: _metrics,
      ...rest
    } = original as Record<string, unknown>;

    return await this.create({
      ...rest,
      slug: `${(rest as { slug?: string }).slug}-copy-${Date.now()}`,
    });
  },
};
