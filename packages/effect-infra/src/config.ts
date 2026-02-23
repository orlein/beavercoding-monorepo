import { Config } from "effect";

export const DatabaseUrl = Config.redacted("DATABASE_URL");

export const SupabaseUrl = Config.string("NEXT_PUBLIC_SUPABASE_URL");

export const SupabaseAnonKey = Config.string("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const SupabaseServiceRoleKey = Config.string(
  "SUPABASE_SERVICE_ROLE_KEY",
);
