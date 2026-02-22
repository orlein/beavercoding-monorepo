import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "packages/ddd-*/src/infrastructure/schema/*.ts",
  out: "supabase/migrations",
});
