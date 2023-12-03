import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProfilePageWrapper } from "@/components/pages/ProfilePage";
import { getUserRecord } from "@/utils/server-side.util";
import { UserResponse } from "@supabase/supabase-js";
import { Database } from "@/table-types";

export default async function ProfilePage() {
	const supabaseServerComponentsClient = createServerComponentClient({
		cookies
	});

	const user = (await supabaseServerComponentsClient.auth.getUser()).data.user;

	const userData: Database["public"]["Tables"]["User"]["Row"] = (
		await getUserRecord(supabaseServerComponentsClient, user?.email)
	).data;

	return <ProfilePageWrapper user={userData} />;
}

export const dynamic = "force-dynamic";
