import { handleRequest } from "@/utils/handlers.util";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		return handleRequest(null, null, 200);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};
