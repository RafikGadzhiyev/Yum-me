import prisma from "@/lib/prisma";
import { handleRequest } from "@/utils/handlers.util";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const userId = searchParams.get("userId");

		if (!userId) {
			return handleRequest(
				null,
				{
					title: "Bad request",
					message: "search parameters did not provide",
				},
				400,
			);
		}

		const savedPost = await prisma.post.findMany({
			where: {
				savedBy: {
					hasSome: [userId],
				},
			},
			include: {
				author: {
					select: {
						name: true,
						lastName: true,
						role: true,
					},
				},
			},
		});

		return handleRequest(savedPost, null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(
			null,
			{
				title: "Server Error!",
				message: "Something went wrong",
			},
			500,
		);
	}
};
