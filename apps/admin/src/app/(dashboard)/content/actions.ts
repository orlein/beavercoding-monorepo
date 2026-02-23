"use server";

import { createServerClient } from "@beavercoding/supabase/server";
import { revalidatePath } from "next/cache";

export async function upsertContent(formData: FormData) {
	const supabase = await createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthenticated");
	}

	const key = String(formData.get("key") ?? "").trim();
	const title = String(formData.get("title") ?? "").trim();
	const body = String(formData.get("body") ?? "").trim();

	if (!key) {
		throw new Error("Key is required");
	}

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { error } = (await (supabase as any)
		.from("static_contents")
		.upsert(
			{
				key,
				title,
				body,
				updated_by: user.id,
				updated_at: new Date().toISOString(),
			},
			{ onConflict: "key" },
		)) as {
		data: null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to upsert content: ${error.message}`);
	}

	revalidatePath("/content");
}

export async function deleteContent(id: string) {
	const supabase = await createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthenticated");
	}

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { error } = (await (supabase as any)
		.from("static_contents")
		.delete()
		.eq("id", id)) as {
		data: null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to delete content: ${error.message}`);
	}

	revalidatePath("/content");
}
