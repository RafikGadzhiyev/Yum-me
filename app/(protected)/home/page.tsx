import { FaLock } from "react-icons/fa";
import { HomePage } from "@/components/pages/HomePage";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { isConfigured } from "@/utils/validation.util";
import { getUserHealthData } from "@/utils/server.utils";

export default async function MainPage() {
	const supabaseServerComponentsClient = createServerComponentClient({
		cookies
	});

	const user = await supabaseServerComponentsClient.auth.getUser();
	const healthdata = await getUserHealthData(user);

	return (
		<div
			className="grid gap-4 relative w-full min-h-full"
			tabIndex={0}
		>
			<HomePage
				user={user.data.user}
				healthData={healthdata}
			/>
			{!isConfigured(healthdata) && (
				<div className="absolute rounded-md top-0 left-0 bg-black/50 w-full h-full text-white flex  flex-col items-center justify-center">
					<div className="text-5xl grid place-items-center">
						<FaLock />
						<span className="text-lg">
							To get access You need fully configure your food wishes and additional
							info
						</span>
					</div>
					<Link
						href="/settings"
						className="rounded-md p-2 my-3 bg-orange-400 transition hover:bg-orange-500 active:bg-orange-600"
					>
						Configure
					</Link>
				</div>
			)}
		</div>
	);
}

export const dynamic = "force-dynamic";
