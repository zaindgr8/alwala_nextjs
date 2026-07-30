import { createClient } from "@supabase/supabase-js";

// Privileged, SERVER-ONLY Supabase client. Uses the secret/service-role key,
// which BYPASSES row-level security — never import this into client components
// or expose the key to the browser. Use for auth reads and all admin writes.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
