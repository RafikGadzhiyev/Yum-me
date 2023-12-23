import { handleRequest } from "@/utils/handlers.util";
import { openAI } from "@/lib/AI";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const prompt = searchParams.get("prompt");

		if (!prompt) {
			return handleRequest(
				null,
				{
					title: "Bad Request",
					message: "You did not provide prompt!",
				},
				403,
			);
		}

		const generatedImage = await openAI.images.generate({
			prompt,
			size: "256x256",
		});

		return handleRequest(
			{
				image: generatedImage,
			},
			null,
			200,
		);
	} catch (e) {
		return NextResponse.json(e, { status: 403 });
	}
};