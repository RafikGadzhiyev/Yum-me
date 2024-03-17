import { NextRequest, NextResponse } from "next/server";
import { handleRequest } from "@/utils/handlers.util";

export const PATCH = async (req: NextRequest) => {
	try {
		const body = await req.json();

		const { userId, subscriberId } = body;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return handleRequest(null, "", 400);
		}

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				subscribers: {
					set: user.subscribers.filter((s) => s !== subscriberId),
				},
			},
		});

		return handleRequest("ok", null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(null, err, 500);
	}
};
