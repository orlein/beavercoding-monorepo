import { createServerClient } from "@beavercoding/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	// `next` param can carry the original destination after login
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createServerClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			// Redirect to the intended destination (default: dashboard)
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// Auth failed — send back to login with an error hint
	return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
