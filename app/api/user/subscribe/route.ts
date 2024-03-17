import { NextRequest, NextResponse } from "next/server";
import { handleRequest } from "@/utils/handlers.util";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
	try {
		const body = await req.json();
		const { userId, subscriberId } = body;

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				subscribers: {
					push: subscriberId,
				},
			},
		});

		return handleRequest("ok", null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(null, err, 500);
	}
};
