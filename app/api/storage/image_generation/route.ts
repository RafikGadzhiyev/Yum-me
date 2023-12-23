import { handleRequest } from "@/utils/handlers.util";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		return handleRequest(null, null, 200);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};