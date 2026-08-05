import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

async function createSuperAdmin() {
  const email = "superadmin@alwalaa.com";
  const password = "SuperAdminPassword123!";
  const passwordHash = await bcrypt.hash(password, 12);
  const userId = crypto.randomUUID();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  console.log(`Creating superadmin user: ${email}...`);

  const { data, error } = await supabaseAdmin
    .from("users")
    .insert([
      {
        id: userId,
        email: email,
        passwordHash: passwordHash,
        role: "SUPER_ADMIN",
        status: "APPROVED",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting user:", error);
    process.exit(1);
  }

  console.log("Successfully created superadmin user!");
  console.log("-----------------------------------");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`User ID: ${userId}`);
  console.log("-----------------------------------");
}

createSuperAdmin().catch(console.error);
