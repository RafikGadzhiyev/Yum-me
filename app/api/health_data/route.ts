import { supabase } from "@/utils/cms.util";
import { handleRequest } from "@/utils/handlers.util";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const userId = searchParams.get("userId");

		if (!userId) {
			return handleRequest(null, {
				title: "Invalid user ID",
				message: "Provided user ID is not valid",
			});
		}

		const { data, error } = await supabase
			.from("User")
			.select()
			.eq("id", userId);

		if (error) {
			return handleRequest(
				null,
				{
					title: error.code,
					message: error.message,
				},
				404
			);
		}

		return handleRequest(data, null, 200);
	} catch (e: any) {
		return handleRequest(
			null,
			{
				title: "Internal Server Error",
				message: e.message,
			},
			501
		);
	}
};
