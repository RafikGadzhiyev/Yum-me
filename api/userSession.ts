import { supabaseClient } from "@/lib/supabase";

export const getUser = async () => {
	const { data, error } = await supabaseClient.auth.getSession();

	if (error) {
		return null;
	}

	if (!data.session) {
		return null;
	}

	return data.session.user;
};