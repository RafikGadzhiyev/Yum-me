import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};
