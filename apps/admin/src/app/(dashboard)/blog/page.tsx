import { createServerClient } from "@beavercoding/supabase/server";
import type { BlogPostRow } from "@beavercoding/supabase/types";
import { Badge } from "@beavercoding/ui/components/badge";
import { Button } from "@beavercoding/ui/components/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@beavercoding/ui/components/table";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import { DeletePostButton } from "./_components/delete-post-button";

type PostStatus = "draft" | "published" | "hidden";

type PostListRow = Pick<
	BlogPostRow,
	"id" | "title" | "slug" | "status" | "created_at" | "updated_at"
>;

const STATUS_VARIANT: Record<
	PostStatus,
	"default" | "secondary" | "outline" | "destructive"
> = {
	published: "default",
	draft: "secondary",
	hidden: "outline",
};

function formatDate(dateStr: string | null) {
	if (!dateStr) return "—";
	return new Date(dateStr).toLocaleDateString("ko-KR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default async function BlogListPage() {
	const supabase = await createServerClient();

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { data: posts, error } = (await (supabase as any)
		.from("blog_posts")
		.select("id, title, slug, status, created_at, updated_at")
		.order("created_at", { ascending: false })) as {
		data: PostListRow[] | null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to fetch posts: ${error.message}`);
	}

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Blog Posts</h1>
					<p className="text-sm text-muted-foreground">
						모든 블로그 글을 관리합니다.
					</p>
				</div>
				<Button asChild>
					<Link href="/blog/new">
						<Plus className="size-4" />새 글 작성
					</Link>
				</Button>
			</div>

			{/* Empty state */}
			{(!posts || posts.length === 0) && (
				<div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
					<FileText className="mb-4 size-10 text-muted-foreground" />
					<p className="text-sm font-medium">아직 작성된 글이 없습니다</p>
					<p className="mt-1 text-xs text-muted-foreground">
						상단의 &quot;새 글 작성&quot; 버튼으로 첫 번째 글을 작성하세요.
					</p>
				</div>
			)}

			{/* Table */}
			{posts && posts.length > 0 && (
				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[40%]">제목</TableHead>
								<TableHead>슬러그</TableHead>
								<TableHead>상태</TableHead>
								<TableHead>작성일</TableHead>
								<TableHead>수정일</TableHead>
								<TableHead className="text-right">작업</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{posts.map((post) => (
								<TableRow key={post.id}>
									<TableCell className="font-medium">
										<Link
											href={`/blog/${post.id}/edit`}
											className="hover:underline"
										>
											{post.title}
										</Link>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{post.slug}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												STATUS_VARIANT[post.status as PostStatus] ?? "secondary"
											}
										>
											{post.status}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(post.created_at)}
									</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(post.updated_at)}
									</TableCell>
									<TableCell>
										<div className="flex items-center justify-end gap-2">
											<Button asChild variant="ghost" size="sm">
												<Link href={`/blog/${post.id}/edit`}>편집</Link>
											</Button>
											<DeletePostButton id={post.id} title={post.title} />
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
