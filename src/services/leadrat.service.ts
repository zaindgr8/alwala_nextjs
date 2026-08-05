import { supabaseRead } from "@/lib/supabase-read";
import { matchCallingCode } from "@/lib/country-codes";

// Leadrat CRM "Website" PUSH integration.
// Docs/endpoint provided by Leadrat for Alwalaa. Every website inquiry is
// forwarded here after it is saved locally.
const LEADRAT_ENDPOINT =
  process.env.LEADRAT_ENDPOINT ||
  "https://connect.leadrat.com/api/v1/integration/Website";
const LEADRAT_API_KEY = process.env.LEADRAT_API_KEY;

// Default lead status / subsource sent to the CRM. The valid status values live
// in Leadrat's config (see the "Lead Status" sheet Leadrat supplied) — override
// via env once confirmed, so we don't hard-code a value the CRM might reject.
const LEADRAT_DEFAULT_STATUS = process.env.LEADRAT_DEFAULT_STATUS || "New Lead";
const LEADRAT_DEFAULT_SUBSOURCE = process.env.LEADRAT_SUBSOURCE || "Website";
const LEADRAT_DEFAULT_COUNTRY_CODE =
  process.env.LEADRAT_DEFAULT_COUNTRY_CODE || "968"; // Oman

export interface LeadratInput {
  name: string;
  email?: string | null;
  phone: string;
  message?: string | null;
  propertyId?: string | null;
}

// Splits a raw phone string into { countryCode, mobile }. The phone input emits
// "+<code> <number>", so the code is matched against the known calling-code list
// (longest prefix first) rather than guessed from digit counts. Tolerates a
// missing "+" and any separators; falls back to the default code when the number
// carries no recognised one (e.g. a legacy local-only record).
function splitPhone(raw: string): { countryCode: string; mobile: string } {
  const digits = (raw || "").replace(/\D/g, "");
  const matched = matchCallingCode(raw);

  if (matched) {
    const bare = matched.slice(1);
    return { countryCode: bare, mobile: digits.slice(bare.length) };
  }

  return { countryCode: LEADRAT_DEFAULT_COUNTRY_CODE, mobile: digits };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// Looks up the inquired property to enrich the CRM lead (project, city,
// location, type, budget). Best-effort — returns null on any miss.
async function loadProperty(propertyId?: string | null) {
  if (!propertyId) return null;
  const { data, error } = await supabaseRead
    .from("properties")
    .select("title,type,city,location,price,community:communities(name)")
    .eq("id", propertyId)
    .maybeSingle();
  if (error) {
    console.warn("[LEADRAT_PUSH] property lookup failed:", error.message);
    return null;
  }
  return data as
    | {
        title?: string;
        type?: string;
        city?: string;
        location?: string;
        price?: number | string;
        community?: { name?: string } | null;
      }
    | null;
}

// Maps our lead + property into Leadrat's expected request body.
export async function buildLeadratPayload(input: LeadratInput) {
  const property = await loadProperty(input.propertyId);
  const { countryCode, mobile } = splitPhone(input.phone);
  const price = property?.price != null ? String(property.price) : "";

  const now = new Date();
  const submittedDate = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${String(
    now.getFullYear()
  ).slice(2)}`; // dd-mm-yy, matching Leadrat's sample
  const submittedTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`;

  return {
    name: input.name,
    state: "",
    city: property?.city || "",
    location: property?.location || "",
    budget: price,
    notes: input.message || "",
    email: input.email || "",
    countryCode,
    mobile,
    project: property?.community?.name || "",
    property: property?.title || "",
    leadExpectedBudget: price,
    propertyType: property?.type || "",
    submittedDate,
    submittedTime,
    LeadId: "",
    subsource: LEADRAT_DEFAULT_SUBSOURCE,
    leadStatus: LEADRAT_DEFAULT_STATUS,
    callRecordingUrl: "",
    scheduledDate: "",
    additionalProperties: {},
  };
}

// Pushes a lead to Leadrat. Never throws to the caller — a CRM outage must not
// break the customer's on-site submission; failures are logged for follow-up.
export async function pushLeadToLeadrat(input: LeadratInput): Promise<void> {
  if (!LEADRAT_API_KEY) {
    console.warn("[LEADRAT_PUSH] LEADRAT_API_KEY not set — skipping CRM push.");
    return;
  }

  try {
    const payload = await buildLeadratPayload(input);
    const res = await fetch(LEADRAT_ENDPOINT, {
      method: "POST",
      headers: {
        "API-Key": LEADRAT_API_KEY,
        "Content-Type": "application/json",
      },
      // Leadrat's endpoint expects an array of leads, not a single object
      // (despite the single-object example in their docs).
      body: JSON.stringify([payload]),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        `[LEADRAT_PUSH] CRM responded ${res.status}: ${text.slice(0, 500)}`
      );
    }
  } catch (err) {
    console.error("[LEADRAT_PUSH] request failed:", err);
  }
}
