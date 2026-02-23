import { createServerClient } from "@beavercoding/supabase/server";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@beavercoding/ui/components/card";
import Link from "next/link";

type BlogPost = {
	id: string;
	title: string;
	slug: string;
	body: string;
	created_at: string | null;
};

async function fetchPosts(): Promise<BlogPost[]> {
	try {
		const supabase = await createServerClient();
		// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
		const { data, error } = (await (supabase as any)
			.from("blog_posts")
			.select("id, title, slug, body, created_at")
			.eq("status", "published")
			.order("created_at", { ascending: false })) as {
			data: BlogPost[] | null;
			error: { message: string } | null;
		};

		if (error) {
			return [];
		}

		return data ?? [];
	} catch {
		return [];
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

function excerpt(body: string, maxLength = 140): string {
	if (body.length <= maxLength) return body;
	return `${body.slice(0, maxLength).trimEnd()}…`;
}

export default async function BlogListPage() {
	const posts = await fetchPosts();

	return (
		<div className="mx-auto max-w-3xl px-4 py-16">
			<h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
			<p className="mb-10 text-muted-foreground">
				Thoughts on engineering, product, and knowledge systems.
			</p>

			{posts.length === 0 ? (
				<div className="rounded-xl border border-border py-16 text-center">
					<p className="text-muted-foreground">
						No posts yet. Check back soon.
					</p>
				</div>
			) : (
				<ul className="flex flex-col gap-6">
					{posts.map((post) => (
						<li key={post.id}>
							<Link href={`/blog/${post.slug}`} className="group block">
								<Card className="transition-shadow group-hover:shadow-md">
									<CardHeader>
										<CardTitle className="group-hover:underline">
											{post.title}
										</CardTitle>
										{post.created_at && (
											<p className="text-xs text-muted-foreground">
												{formatDate(post.created_at)}
											</p>
										)}
									</CardHeader>
									<CardContent>
										<CardDescription>{excerpt(post.body)}</CardDescription>
									</CardContent>
								</Card>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
