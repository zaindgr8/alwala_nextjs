import { createClient } from "@supabase/supabase-js";

// Read-only Supabase client for server-side public reads (respects RLS via the
// publishable key). No session persistence — safe to reuse across requests.
export const supabaseRead = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false } }
);
