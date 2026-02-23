"use server";

import { createServerClient } from "@beavercoding/supabase/server";
import type { PostStatus as DbPostStatus } from "@beavercoding/supabase/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Convert a human-readable title into a URL-safe slug.
 * Lowercases, replaces spaces with hyphens, removes non-alphanumeric chars.
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

export type PostStatus = DbPostStatus;

export async function createPost(formData: FormData) {
	const supabase = await createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthenticated");
	}

	const title = String(formData.get("title") ?? "").trim();
	const body = String(formData.get("body") ?? "").trim();
	const status = (formData.get("status") ?? "draft") as PostStatus;

	if (!title) {
		throw new Error("Title is required");
	}

	const slug = generateSlug(title);

	// The Database type is a placeholder until `pnpm run generate` runs.
	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { error } = (await (supabase as any)
		.from("blog_posts")
		.insert({ title, slug, body, status, author_id: user.id })) as {
		data: null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to create post: ${error.message}`);
	}

	revalidatePath("/blog");
	redirect("/blog");
}

export async function updatePost(id: string, formData: FormData) {
	const supabase = await createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthenticated");
	}

	const title = String(formData.get("title") ?? "").trim();
	const body = String(formData.get("body") ?? "").trim();
	const status = (formData.get("status") ?? "draft") as PostStatus;

	if (!title) {
		throw new Error("Title is required");
	}

	const slug = generateSlug(title);

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { error } = (await (supabase as any)
		.from("blog_posts")
		.update({ title, slug, body, status, updated_at: new Date().toISOString() })
		.eq("id", id)
		.eq("author_id", user.id)) as {
		data: null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to update post: ${error.message}`);
	}

	revalidatePath("/blog");
	revalidatePath(`/blog/${id}/edit`);
	redirect("/blog");
}

export async function deletePost(id: string) {
	const supabase = await createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthenticated");
	}

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { error } = (await (supabase as any)
		.from("blog_posts")
		.delete()
		.eq("id", id)
		.eq("author_id", user.id)) as {
		data: null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to delete post: ${error.message}`);
	}

	revalidatePath("/blog");
}
