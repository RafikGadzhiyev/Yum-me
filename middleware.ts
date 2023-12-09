import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { AUTH_ROUTES, ROUTES } from "@/consts/routes.const";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const currentPath = req.nextUrl.pathname;
	const isAuthPage =
		currentPath.startsWith(AUTH_ROUTES.SIGN_IN.path) ||
		currentPath.startsWith(AUTH_ROUTES.SIGN_UP.path);

	// if (currentPath.startsWith(AUTH_ROUTES.EMAIL_VERIFICATION.path)) {
	// 	return res;
	// }
	if (!user && !isAuthPage) {
		return NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_IN.path, req.url));
	} else if (user && isAuthPage) {
		return NextResponse.redirect(new URL(ROUTES.HOME.path, req.url));
	}

	return res;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};