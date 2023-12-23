import { FaLock } from "react-icons/fa";
import { HomePage } from "@/components/pages/HomePage";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { isConfigured } from "@/utils/validation.util";
import { getUserRecord } from "@/api/userInfoFromDatabase";

export default async function MainPage() {
	const supabaseServerComponentsClient = createServerComponentClient({
		cookies,
	});

	const user = (await supabaseServerComponentsClient.auth.getUser()).data.user;
	const userData: User = (
		await getUserRecord(supabaseServerComponentsClient, user?.email)
	).data;

	return (
		<div
			className="relative grid min-h-full w-full gap-4"
			tabIndex={0}
		>
			<HomePage
				user={user}
				healthData={userData}
			/>
			{!isConfigured(userData) && (
				<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center  rounded-md bg-black/50 text-white">
					<div className="grid place-items-center text-5xl">
						<FaLock />
						<span className="text-lg">
							To get access You need fully configure your food wishes and additional
							info
						</span>
					</div>
					<Link
						href="/settings"
						className="my-3 rounded-md bg-orange-400 p-2 transition hover:bg-orange-500 active:bg-orange-600"
					>
						Configure
					</Link>
				</div>
			)}
		</div>
	);
}

export const dynamic = "force-dynamic";