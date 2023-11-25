import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/utils/instances.util";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionCreateParams } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

// export const runtime= "edge";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const cookiesStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });

		const searchParams = req.nextUrl.searchParams;
		const requestedBy = searchParams.get("email");

		console.log(requestedBy);

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

		const requestPayload: ChatCompletionCreateParams = {
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
			temperature: 0.7,
			stream: true,
			n: 1,
		};

		const encoder = new TextEncoder();

		const textGenerationResult = await openAI.chat.completions.create(
			requestPayload
		);

		const stream = OpenAIStream(textGenerationResult);

		return new StreamingTextResponse(stream);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};
