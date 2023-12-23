import { handleRequest } from "@/utils/handlers.util";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const GET = async (req: NextRequest) => {
	try {
		const cookiesStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });

		const email = req.nextUrl.searchParams.get("email");

		if (!email) {
			return handleRequest(null, null, 200);
		}

		const { data, error } = await supabase
			.from("User")
			.select("generated_foods")
			.eq("email", email)
			.limit(1)
			.single();

		if (error) {
			return handleRequest(
				null,
				{
					title: error.message,
					message: error.details,
				},
				502,
			);
		}

		return handleRequest(data.generated_foods, null, 200);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const cookiesStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });
		const body = await req.json();
		const { food, generatedDate, email } = body;

		const { data: userData, error } = await supabase
			.from("User")
			.select("generated_foods")
			.eq("email", email)
			.limit(1)
			.single();

		if (error) {
			return handleRequest(
				null,
				{
					title: error.message,
					message: error.details,
				},
				403,
			);
		}

		const generatedFoods = userData?.generated_foods || [];

		const savedGeneratedFoods = {
			_id: uuidv4(),
			generatedDate,
			food: food,
		};

		generatedFoods.push(savedGeneratedFoods);

		const { data, error: updateError } = await supabase
			.from("User")
			.update({ generated_foods: generatedFoods })
			.eq("email", email)
			.select("generated_foods");

		if (updateError) {
			return handleRequest(
				null,
				{
					title: updateError?.message,
					message: updateError?.details,
				},
				400,
			);
		}

		return handleRequest(data, null, 200);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};