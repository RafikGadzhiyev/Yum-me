import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/lib/AI";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionCreateParams } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const MAX_MESSAGE_TOKEN_LENGTH = 4097;

export const POST = async (req: NextRequest) => {
	try {
		const { lang, ingredients } = await req.json();

		const message = `Язык ответа - ${lang}\n Нужен рецепт блюда из следующих ингредиентов:\n\n${ingredients} ANSWER_LANGUAGE = MARKDOWN`;

		if (message.length > MAX_MESSAGE_TOKEN_LENGTH) {
			return handleRequest(
				null,
				{
					title: "Bad Request",
					message: "Message is too long",
				},
				403,
			);
		}

		const requestPayload: ChatCompletionCreateParams = {
			messages: [
				// {
				// 	role: "system",
				// 	content: "You are the professional cook",
				// },
				{
					role: "user",
					content: message,
				},
				// {
				// 	role: "assistant",
				// 	content: "[Give food by given ingredients]",
				// },
			],
			model: "gpt-3.5-turbo",
			// model: "ft:gpt-3.5-turbo-0125:personal:food-cook:9MHkPow8",
			// model: "gpt-4-1106-preview",
			temperature: 0.7,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			// max_tokens: 500,  // Generated message length constraint
			stream: true,
			n: 1,
		};

		const textGenerationResult =
			await openAI.chat.completions.create(requestPayload);

		const stream = OpenAIStream(textGenerationResult);

		return new StreamingTextResponse(stream);
	} catch (e) {
		console.error(e);

		return NextResponse.json(e, { status: 403 });
	}
};
