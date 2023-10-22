import { openAI } from "@/utils/instances.util";
import { isDevMode } from "@/utils/nodeEnvType.util";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		if (!isDevMode()) {
			return NextResponse.json(
				{
					message: "It is not development mode! Request restricted",
				},
				{
					status: 403,
				}
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

		return NextResponse.json({ image });
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};
