import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/lib/AI";
import { isDev } from "@/utils/nodeEnvType.util";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		if (!isDev) {
			return handleRequest(
				null,
				{
					title: "Bad Request",
					message: "It is not development mode! Request restricted",
				},
				403
			);
		}
		// const prompt_result = await openAI.chat.completions.create({
		// 	messages: [
		// 		{
		// 			role: "user",
		// 			content:
		// 				"Write a code that will return factorial chain! Your solution should be as markdown",
		// 		},
		// 	],
		// 	model: "gpt-3.5-turbo",
		// });
		// return NextResponse.json({
		// 	message: prompt_result.choices[0].message.content,
		// });

		const image = await openAI.images.generate({
			prompt: "Вечеринка в солнечный день!",
			size: "256x256",
		});

		return handleRequest(image, null, 200);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};