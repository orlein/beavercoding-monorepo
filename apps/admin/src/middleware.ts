import { updateSession } from "@beavercoding/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PATHS = ["/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow public paths through — still refresh session cookies
	if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
		return updateSession(request);
	}

	// Refresh session cookies
	const response = await updateSession(request);

	// Check auth state to gate protected routes
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(
					cookiesToSet: { name: string; value: string; options?: object }[],
				) {
					for (const { name, value } of cookiesToSet) {
						request.cookies.set(name, value);
					}
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except static Next.js internals and common
		 * static asset paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
