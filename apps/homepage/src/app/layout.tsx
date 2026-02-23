import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BeaverCoding",
	description: "React Native, Next.js, Node.js — 지식을 코드로",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko" className={inter.className}>
			<body className="flex min-h-screen flex-col bg-background text-foreground">
				<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
					<div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
						<Link
							href="/"
							className="text-sm font-semibold tracking-tight hover:opacity-80"
						>
							BeaverCoding
						</Link>
						<nav className="flex gap-6 text-sm text-muted-foreground">
							<Link
								href="/"
								className="hover:text-foreground transition-colors"
							>
								Home
							</Link>
							<Link
								href="/blog"
								className="hover:text-foreground transition-colors"
							>
								Blog
							</Link>
						</nav>
					</div>
				</header>

				<main className="flex-1">{children}</main>

				<footer className="border-t border-border">
					<div className="mx-auto flex h-12 max-w-5xl items-center justify-center px-4">
						<p className="text-xs text-muted-foreground">
							&copy; {new Date().getFullYear()} BeaverCoding. All rights
							reserved.
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
}
