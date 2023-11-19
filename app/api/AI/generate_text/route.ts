import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/utils/instances.util";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const cookiesStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });

		const searchParams = req.nextUrl.searchParams;
		const requestedBy = searchParams.get("email");

		if (!requestedBy) {
			return handleRequest(
				null,
				{
					title: "Bad Request",
					message: "Email did not provided",
				},
				403
			);
		}

		const { data, error } = await supabase
			.from("User")
			.select()
			.eq("email", requestedBy)
			.select(
				"age, weight, height, contraindications, wishes, gender, calories_per_day"
			);

		const message = `Нужен рацион питания для следующего случая:\n\n${JSON.stringify(
			data
		)}\n\nНапиши без лишнего вступления, ни с чем не связывай, так как я это буду отправлять человеку, он должен понять, что ему это адресованно. Язык, на котором нужно написать - Markdown`;

		const textGenerationResult = await openAI.chat.completions.create({
			messages: [
				{
					role: "system",
					content:
						"Act as professional nutritionist and answer the user queries",
				},
				{
					role: "user",
					content: message,
				},
			],
			model: "gpt-3.5-turbo",
		});

		return handleRequest(
			{
				result: textGenerationResult.choices[0].message.content,
			},
			null,
			200
		);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};
