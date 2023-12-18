import { SupabaseClient } from "@supabase/supabase-js";

export const getUserRecord = async (
	supabaseServerClient: SupabaseClient<any, "public", any>,
	email: string | null | undefined
) => {
	return supabaseServerClient
		.from("User")
		.select("*")
		.eq("email", email)
		.limit(1)
		.single();
};