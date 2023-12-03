import { supabaseClient } from "@/lib/supabase";

export const getUser = async () => {
	const { data, error } = await supabaseClient.auth.getSession();

	if (error) {
		return null;
	}

	if (!data.session) {
		return null;
	}

	let user = data.session.user;

	return user;
};