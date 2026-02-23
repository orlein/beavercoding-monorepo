import { Card, CardContent, CardHeader, CardTitle } from "@beavercoding/ui/components/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createPost } from "../actions";
import { PostForm } from "../_components/post-form";

export default function NewBlogPostPage() {
	async function handleCreate(formData: FormData) {
		"use server";
		await createPost(formData);
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
				<h1 className="text-2xl font-semibold tracking-tight">새 글 작성</h1>
				<p className="text-sm text-muted-foreground">
					새로운 블로그 글을 작성합니다.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-base">글 정보</CardTitle>
				</CardHeader>
				<CardContent>
					<PostForm action={handleCreate} submitLabel="글 발행" />
				</CardContent>
			</Card>
		</div>
	);
}
