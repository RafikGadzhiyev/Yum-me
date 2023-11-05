import { handleRequest } from "@/utils/handlers.util";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const cookiesStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });
		const searchParams = req.nextUrl.searchParams;
		const email = searchParams.get("email");

		if (!email) {
			return handleRequest(null, {
				title: "Invalid user ID",
				message: "Provided user ID is not valid",
			});
		}

		let { data, error } = await supabase
			.from("User")
			.select()
			.eq("email", email);

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

		data = data ? data[0] : {};

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

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		const cookiesStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });
		const searchParams = req.nextUrl.searchParams;
		const email = searchParams.get("email");

		const body = await req.json();

		if (!email) {
			return handleRequest(null, {
				title: "Invalid user ID",
				message: "Provided user ID is not valid",
			});
		}

		console.log(email);

		const { error } = await supabase
			.from("User")
			.update({
				age: body.age,
				weight: body.weight,
				height: body.height,
			})
			.eq("email", email);

		if (error) {
			return handleRequest(null, { title: error.message });
		}

		return handleRequest("Ok", error, 200);
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
