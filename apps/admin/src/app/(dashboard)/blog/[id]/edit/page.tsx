import { createServerClient } from "@beavercoding/supabase/server";
import type { BlogPostRow } from "@beavercoding/supabase/types";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@beavercoding/ui/components/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "../../_components/post-form";
import { type PostStatus, updatePost } from "../../actions";

type PostEditRow = Pick<BlogPostRow, "id" | "title" | "body" | "status">;

interface EditBlogPostPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({
	params,
}: EditBlogPostPageProps) {
	const { id } = await params;
	const supabase = await createServerClient();

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { data: post, error } = (await (supabase as any)
		.from("blog_posts")
		.select("id, title, body, status")
		.eq("id", id)
		.single()) as {
		data: PostEditRow | null;
		error: { message: string } | null;
	};

	if (error || !post) {
		notFound();
	}

	async function handleUpdate(formData: FormData) {
		"use server";
		await updatePost(id, formData);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Link
					href="/blog"
					className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
				>
					<ChevronLeft className="size-4" />
					Blog Posts
				</Link>
			</div>

			<div>
				<h1 className="text-2xl font-semibold tracking-tight">글 편집</h1>
				<p className="truncate text-sm text-muted-foreground">{post.title}</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-base">글 정보</CardTitle>
				</CardHeader>
				<CardContent>
					<PostForm
						action={handleUpdate}
						defaultValues={{
							title: post.title,
							body: post.body ?? "",
							status: post.status as PostStatus,
						}}
						submitLabel="변경 사항 저장"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
