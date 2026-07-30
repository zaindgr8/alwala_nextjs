import { LeadStatus } from "@/types/db";
import { supabaseAdmin } from "@/lib/supabase-admin";

// NOTE: This Supabase project's `leads` table is the shared CRM schema
// (organization-scoped, rich stage/pipeline columns) — NOT the app's old simple
// Lead model. We map the app's simple fields onto the CRM columns here.

// The single organization in this project ("Alwalaa Real Estate").
const ORG_ID =
  process.env.LEAD_ORGANIZATION_ID || "6a32be59-155d-4662-9058-3a74fb2b6872";

// App LeadStatus  <->  CRM `stage` enum (new|qualified|engaged|viewing|
// negotiation|reservation|closed_won|closed_lost).
const STATUS_TO_STAGE: Record<string, string> = {
  NEW: "new",
  CONTACTED: "engaged",
  QUALIFIED: "qualified",
  ARCHIVED: "closed_lost",
};
const STAGE_TO_STATUS: Record<string, LeadStatus> = {
  new: LeadStatus.NEW,
  engaged: LeadStatus.CONTACTED,
  qualified: LeadStatus.QUALIFIED,
  closed_lost: LeadStatus.ARCHIVED,
};

function stageToStatus(stage: string | null): LeadStatus {
  if (stage && STAGE_TO_STATUS[stage]) return STAGE_TO_STATUS[stage];
  // Any other pipeline stage (viewing/negotiation/…) shows as CONTACTED.
  return stage === "new" ? LeadStatus.NEW : LeadStatus.CONTACTED;
}

// Maps a raw CRM lead row to the simple shape the app/admin UI expects.
function toAppLead(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    name: (row.name as string) ?? "",
    email: (row.email as string) ?? "",
    phone: (row.phone_e164 as string) ?? "",
    message: (row.notes as string) ?? "",
    status: stageToStatus(row.stage as string | null),
    propertyId: null,
    property: null,
    createdAt: row.created_at as string,
  };
}

export interface LeadFilters {
  status?: LeadStatus;
  search?: string;
}

export const leadService = {
  async getAll(filters: LeadFilters = {}) {
    const { status, search } = filters;

    let query = supabaseAdmin
      .from("leads")
      .select("*")
      .eq("organization_id", ORG_ID)
      .order("created_at", { ascending: false });

    if (status && STATUS_TO_STAGE[status]) {
      query = query.eq("stage", STATUS_TO_STAGE[status]);
    }
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,notes.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(toAppLead);
  },

  async updateStatus(id: string, status: LeadStatus) {
    const stage = STATUS_TO_STAGE[status];
    const { data, error } = await supabaseAdmin
      .from("leads")
      .update({ stage })
      .eq("id", id)
      .eq("organization_id", ORG_ID)
      .select("*")
      .single();
    if (error) throw error;
    return toAppLead(data);
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("leads")
      .delete()
      .eq("id", id)
      .eq("organization_id", ORG_ID);
    if (error) throw error;
    return { id };
  },

  // Public website inquiry. Maps into the CRM leads table as a fresh lead.
  async create(data: {
    name: string;
    email?: string;
    phone?: string;
    message?: string;
    propertyId?: string | null;
  }) {
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        organization_id: ORG_ID,
        name: data.name,
        email: data.email || null,
        phone_e164: data.phone || null,
        notes: data.message || null,
        stage: "new",
        source: "Website",
      })
      .select("*")
      .single();
    if (error) throw error;
    return toAppLead(row);
  },
};
