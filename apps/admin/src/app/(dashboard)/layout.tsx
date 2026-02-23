import { createServerClient } from "@beavercoding/supabase/server";
import { Button } from "@beavercoding/ui/components/button";
import { Separator } from "@beavercoding/ui/components/separator";
import { cn } from "@beavercoding/ui/lib/utils";
import { FileText, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface NavItem {
	href: string;
	label: string;
	icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
	{ href: "/", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/blog", label: "Blog Posts", icon: FileText },
	{ href: "/content", label: "Static Content", icon: Settings },
];

async function signOut() {
	"use server";
	const supabase = await createServerClient();
	await supabase.auth.signOut();
	redirect("/login");
}

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = await createServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<aside className="flex w-64 shrink-0 flex-col border-r bg-sidebar">
				<div className="flex h-14 items-center px-6">
					<span className="text-lg font-semibold text-sidebar-foreground">
						BeaverCoding
					</span>
				</div>
				<Separator className="bg-sidebar-border" />
				<nav className="flex flex-1 flex-col gap-1 p-3">
					{NAV_ITEMS.map(({ href, label, icon: Icon }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
								"text-sidebar-foreground transition-colors",
								"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							)}
						>
							<Icon className="size-4 shrink-0" />
							{label}
						</Link>
					))}
				</nav>
				<Separator className="bg-sidebar-border" />
				<div className="p-3">
					<div className="mb-2 truncate px-3 text-xs text-muted-foreground">
						{user.email}
					</div>
					<form action={signOut}>
						<Button
							type="submit"
							variant="ghost"
							size="sm"
							className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
						>
							<LogOut className="size-4" />
							Sign out
						</Button>
					</form>
				</div>
			</aside>

			{/* Main content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
