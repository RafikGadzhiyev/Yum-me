import { User } from "@supabase/supabase-js";
import { supabase, supabaseClient } from "@/lib/supabase";
import { handleRequest } from "./handlers.util";
import { isEmpty } from "./validation.util";

// ? Connect types with Supabase types
export const signUp = async (formData: Record<string, string>) => {
	const { email, password, captchaToken } = formData;

	const newUser = await supabase.auth.signUp({
		email,
		password,
		options: {
			captchaToken,
		},
	});

	if (newUser.error) {
		return handleRequest(
			null,
			{
				title: newUser.error.name,
				message: newUser.error.message,
			},
			400
		);
	}

	return handleRequest<User>(newUser.data.user as User, null, 200);
};

export const signIn = async (formData: Record<string, string>) => {
	const { email, password, captchaToken } = formData;

	if (isEmpty(email) || isEmpty(password)) {
		return handleRequest(
			null,
			{ title: "Invalid data", message: "Please, fill fields" },
			400
		);
	}

	const session = await supabase.auth.signInWithPassword({
		email,
		password,
		options: {
			captchaToken,
		},
	});

	if (session.error) {
		return handleRequest(
			null,
			{ title: session.error.name, message: session.error.message },
			400
		);
	}

	return handleRequest<User>(session.data.user as User, null, 200);
};

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
