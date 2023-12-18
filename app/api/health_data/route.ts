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
			return handleRequest(
				null,
				{
					title: "Invalid user ID",
					message: "Provided user ID is not valid",
				},
				403
			);
		}

		let { data, error } = await supabase
			.from("User")
			.select(
				"age, weight, height, contraindications, wishes, gender, calories_per_day"
			)
			.eq("email", email)
			.limit(1)
			.single();

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

		data = data || {
			age: 0,
			weight: 0,
			height: 0,
			wishes: "",
			contraindications: "",
			gender: null,
			calories_per_day: 0,
		};

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
			return handleRequest(
				null,
				{
					title: "Invalid user ID",
					message: "Provided user ID is not valid",
				},
				403
			);
		}

		const { error } = await supabase
			.from("User")
			.update({
				age: body.age,
				weight: body.weight,
				height: body.height,
				gender: body.gender,
				calories_per_day: body.calories_per_day,
				contraindications: body.contraindications,
				wishes: body.wishes,
			})
			.eq("email", email);

		if (error) {
			return handleRequest(null, { title: error.message }, 403);
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