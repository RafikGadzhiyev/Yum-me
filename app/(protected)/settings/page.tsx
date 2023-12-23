import { SettingsPageWrapper } from "@/components/pages/SettingsPage";
import { getUserHealthData } from "@/api/userHealthData";
import {
	createServerComponentClient,
	User as UserSession,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function SettingsPage() {
	const supabaseServerComponentsClient = createServerComponentClient({
		cookies,
	});

	const user = await supabaseServerComponentsClient.auth.getUser();
	const data = await getUserHealthData(user);

	return (
		<div>
			<SettingsPageWrapper
				config={data}
				user={user.data.user as UserSession}
			/>
		</div>
	);
}

export const revalidate = 0;