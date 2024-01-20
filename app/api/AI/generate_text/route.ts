import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/lib/AI";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionCreateParams } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const MAX_MESSAGE_TOKEN_LENGTH = 4097;

export const POST = async (req: NextRequest) => {
	try {
		const data = await req.json();

		// TODO: Create message with i18n
		const message = `Нужен рацион питания для следующего случая:\n\n${JSON.stringify(
			data,
		)}\n\nНапиши без лишнего вступления, ни с чем не связывай, так как я это буду отправлять человеку, он должен понять, что ему это адресованно. Язык, на котором нужно написать - Markdown`;

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
				{
					role: "system",
					content: "Act as professional nutritionist and answer the user queries",
				},
				{
					role: "user",
					content: message,
				},
			],
			model: "gpt-3.5-turbo",
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
		return NextResponse.json(e, { status: 403 });
	}
};