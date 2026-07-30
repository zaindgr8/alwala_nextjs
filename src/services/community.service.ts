import { supabaseRead } from "@/lib/supabase-read";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const communityService = {
  // List all communities with a property count, ordered by name.
  async getAll() {
    const { data, error } = await supabaseRead
      .from("communities")
      .select("*,properties(count)")
      .order("name", { ascending: true });
    if (error) throw error;

    // Flatten Supabase's `properties: [{ count }]` into Prisma-style `_count`.
    return (data ?? []).map((c: Record<string, unknown>) => {
      const propsCount = Array.isArray(c.properties)
        ? ((c.properties[0] as { count?: number })?.count ?? 0)
        : 0;
      const { properties: _p, ...rest } = c;
      return { ...rest, _count: { properties: propsCount } };
    });
  },

  async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("communities")
      .select("*,properties(*)")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async create(data: Record<string, unknown>) {
    const { data: row, error } = await supabaseAdmin
      .from("communities")
      .insert(data)
      .select("*")
      .single();
    if (error) throw error;
    return row;
  },

  async update(id: string, data: Record<string, unknown>) {
    const { data: row, error } = await supabaseAdmin
      .from("communities")
      .update(data)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return row;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("communities")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return { id };
  },
};
