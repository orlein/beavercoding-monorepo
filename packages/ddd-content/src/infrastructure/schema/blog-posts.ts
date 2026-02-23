import { sql } from "drizzle-orm";
import { pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authenticatedRole, authUid } from "drizzle-orm/supabase";

export const blogPosts = pgTable(
	"blog_posts",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		title: text("title").notNull(),
		slug: text("slug").notNull().unique(),
		body: text("body").notNull().default(""),
		status: text("status", { enum: ["draft", "published", "hidden"] })
			.notNull()
			.default("draft"),
		authorId: uuid("author_id").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		pgPolicy("blog_posts_select_published", {
			for: "select",
			to: "anon",
			using: sql`${table.status} = 'published'`,
		}),
		pgPolicy("blog_posts_select_own", {
			for: "select",
			to: authenticatedRole,
			using: sql`${table.authorId} = ${authUid}`,
		}),
		pgPolicy("blog_posts_insert", {
			for: "insert",
			to: authenticatedRole,
			withCheck: sql`${table.authorId} = ${authUid}`,
		}),
		pgPolicy("blog_posts_update_own", {
			for: "update",
			to: authenticatedRole,
			using: sql`${table.authorId} = ${authUid}`,
		}),
		pgPolicy("blog_posts_delete_own", {
			for: "delete",
			to: authenticatedRole,
			using: sql`${table.authorId} = ${authUid}`,
		}),
	],
);
