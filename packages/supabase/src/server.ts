import { createServerClient as _createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types.js";

/**
 * Creates a Supabase client for use in Server Components, Route Handlers, and
 * Server Actions. Cookie management is delegated to Next.js `cookies()`.
 *
 * The returned client is typed using our manually-maintained `Database` type.
 * Once `pnpm run generate` populates `types.ts` from a live Supabase instance
 * the types become fully accurate.
 */
export async function createServerClient() {
	const cookieStore = await cookies();

	return _createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							cookieStore.set(name, value, options);
						}
					} catch {
						// setAll is called from a Server Component — ignore.
						// The middleware handles session refresh.
					}
				},
			},
		},
	);
}

export type { Database };
