import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/utils/instances.util";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const messageForGeneration = searchParams.get("message");

		if (!messageForGeneration) {
			return handleRequest(null, {
				title: "Bad Request",
				message: "You did not provide message!",
			});
		}

		const textGenerationResult = await openAI.chat.completions.create({
			messages: [
				{
					role: "user",
					content: messageForGeneration,
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
