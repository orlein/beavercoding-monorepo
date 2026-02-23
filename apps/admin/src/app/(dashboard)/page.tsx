import { createServerClient } from "@beavercoding/supabase/server";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@beavercoding/ui/components/card";
import { FileText, Settings, User } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
	const supabase = await createServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Fetch quick stats — cast needed while DB types are placeholders
	const [postResult, contentResult] = await Promise.all([
		// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
		(supabase as any)
			.from("blog_posts")
			.select("*", { count: "exact", head: true }) as Promise<{
			count: number | null;
			error: { message: string } | null;
		}>,
		// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
		(supabase as any)
			.from("static_contents")
			.select("*", { count: "exact", head: true }) as Promise<{
			count: number | null;
			error: { message: string } | null;
		}>,
	]);

	const postCount = postResult.count ?? 0;
	const contentCount = contentResult.count ?? 0;

	const shortcuts = [
		{
			href: "/blog",
			title: "Blog Posts",
			description: "글 목록 관리 및 새 글 작성",
			icon: FileText,
			count: postCount,
			unit: "posts",
		},
		{
			href: "/content",
			title: "Static Content",
			description: "사이트 정적 콘텐츠 관리",
			icon: Settings,
			count: contentCount,
			unit: "items",
		},
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
				<p className="text-sm text-muted-foreground">
					BeaverCoding 관리자 대시보드에 오신 것을 환영합니다.
				</p>
			</div>

			{/* Current user info */}
			<Card>
				<CardHeader className="flex flex-row items-center gap-3 pb-2">
					<User className="size-5 text-muted-foreground" />
					<CardTitle className="text-base">현재 사용자</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm">
						<span className="font-medium">{user?.email}</span>
					</p>
					{user?.user_metadata?.full_name && (
						<p className="text-xs text-muted-foreground">
							{String(user.user_metadata.full_name)}
						</p>
					)}
				</CardContent>
			</Card>

			{/* Quick access */}
			<div className="grid gap-4 sm:grid-cols-2">
				{shortcuts.map(
					({ href, title, description, icon: Icon, count, unit }) => (
						<Link key={href} href={href} className="group">
							<Card className="transition-shadow group-hover:shadow-md">
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="text-base">{title}</CardTitle>
									<Icon className="size-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{count}</div>
									<CardDescription className="mt-1">{unit}</CardDescription>
									<p className="mt-2 text-xs text-muted-foreground">
										{description}
									</p>
								</CardContent>
							</Card>
						</Link>
					),
				)}
			</div>
		</div>
	);
}
