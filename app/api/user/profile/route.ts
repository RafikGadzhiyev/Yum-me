import { User, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { handleRequest } from "@/utils/handlers.util";

export const GET = async () => {
	try {
		const supabase = createRouteHandlerClient({ cookies });

		const {
			data: { session: userSession },
		} = await supabase.auth.getSession();

		let currentUser = userSession?.user;

		if (!currentUser) {
			const headerList = headers();
			const authorization = headerList.get("authorization");
			console.log(authorization, headerList);
			const [_, token] = authorization?.split(" ") as string[];

			const { data: userData } = await supabase.auth.getUser(token);
			currentUser = userData.user as User;
		}

		if (!currentUser) {
			return handleRequest(
				null,
				{
					title: "Unauthorized",
					message: "You are not authorized",
				},
				401
			);
		}

		const userClientSessionData = {
			id: currentUser.id,
			phone: currentUser.phone,
			email: currentUser.email,
			user_metadata: currentUser.user_metadata,
			created_at: currentUser.created_at,
			updated_at: currentUser.updated_at,
		};

		return handleRequest(userClientSessionData, null, 200);
	} catch (err: any) {
		return handleRequest(
			null,
			{
				title: "Server error",
				message: err.message,
			},
			500
		);
	}
};
