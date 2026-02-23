import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@beavercoding/supabase/server";
import { Button } from "@beavercoding/ui/components/button";
import { Separator } from "@beavercoding/ui/components/separator";

type Post = {
	id: string;
	title: string;
	slug: string;
	body: string;
	author_id: string;
	created_at: string | null;
};

async function fetchPost(slug: string): Promise<Post | null> {
	try {
		const supabase = await createServerClient();
		// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
		const { data, error } = (await (supabase as any)
			.from("blog_posts")
			.select("id, title, slug, body, author_id, created_at")
			.eq("slug", slug)
			.eq("status", "published")
			.single()) as {
			data: Post | null;
			error: { message: string } | null;
		};

		if (error || !data) return null;
		return data;
	} catch {
		return null;
	}
}

function formatDate(iso: string | null): string {
	if (!iso) return "";
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await fetchPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-16">
			<Button variant="ghost" size="sm" asChild className="-ml-2 mb-8">
				<Link href="/blog">&larr; Back to blog</Link>
			</Button>

			<article>
				<header className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
					<div className="mt-3 flex gap-3 text-sm text-muted-foreground">
						{post.created_at && <span>{formatDate(post.created_at)}</span>}
					</div>
				</header>

				<Separator className="mb-8" />

				<div className="prose prose-neutral max-w-none text-foreground">
					{post.body.split("\n").map((paragraph, i) =>
						paragraph.trim() ? (
							// biome-ignore lint/suspicious/noArrayIndexKey: static server-rendered paragraphs
							<p key={i} className="mb-4 leading-relaxed">
								{paragraph}
							</p>
						) : null,
					)}
				</div>
			</article>
		</div>
	);
}
