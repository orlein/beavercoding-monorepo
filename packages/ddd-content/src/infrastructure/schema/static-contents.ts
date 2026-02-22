import { pgTable, uuid, text, timestamp, pgPolicy } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { authenticatedRole, authUid } from "drizzle-orm/supabase";

export const staticContents = pgTable(
  "static_contents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull().unique(),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    updatedBy: uuid("updated_by"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    pgPolicy("static_contents_select_all", {
      for: "select",
      to: "anon",
      using: sql`true`,
    }),
    pgPolicy("static_contents_modify", {
      for: "all",
      to: authenticatedRole,
      using: sql`${table.updatedBy} = ${authUid}`,
    }),
  ],
);
