import { NextRequest } from "next/server";
import { handleRequest } from "@/utils/handlers.util";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const _subscribers = (searchParams.get("_ids") || "").split(",");

		const subscribers = await prisma.user.findMany({
			where: {
				id: {
					in: _subscribers,
				},
			},
			select: {
				id: true,
				email: true,
				name: true,
				lastName: true,
				age: true,
				role: true,
			},
		});

		return handleRequest({ subscribers }, null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(null, err, 500);
	}
};
