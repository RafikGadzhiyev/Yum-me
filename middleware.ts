import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { ROUTES } from "./configs/routes.config";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user && req.nextUrl.pathname !== "/") {
		return NextResponse.redirect(new URL("/", req.url));
	} else if (user && req.nextUrl.pathname == "/") {
		return NextResponse.redirect(new URL(ROUTES.HOME.path, req.url));
	}

	return res;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
