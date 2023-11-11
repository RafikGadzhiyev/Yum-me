import { Loading } from "@/components/UI/Loading";
import { SettingsPageWrapper } from "@/components/pages/SettingsPage";
import { getUser } from "@/utils/server.utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function SettingsPage() {
	const supabaseServerComponentsClient = createServerComponentClient({
		cookies,
	});

	const user = await supabaseServerComponentsClient.auth.getUser();
	const data = await getUser(user);

	return (
		<div>
			<SettingsPageWrapper
				config={data}
				user={user.data.user}
			/>
		</div>
	);
}

export const dynamic = "force-dynamic";
