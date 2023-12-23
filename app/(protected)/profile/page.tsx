import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProfilePageWrapper } from "@/components/pages/ProfilePage";
import { getUserRecord } from "@/api/userInfoFromDatabase";

export default async function ProfilePage() {
	const supabaseServerComponentsClient = createServerComponentClient({
		cookies,
	});

	const user = (await supabaseServerComponentsClient.auth.getUser()).data.user;
	const userData: User = (
		await getUserRecord(supabaseServerComponentsClient, user?.email)
	).data;

	return <ProfilePageWrapper user={userData} />;
}

export const dynamic = "force-dynamic";