import { User } from "@supabase/supabase-js";
import { supabase, supabaseClient } from "./cms.util";
import { handleRequest, handlerError, hanldeData } from "./handlers.util";
import { isEmpty } from "./validation.util";

// ? Connect types with Supabase types

export const signUp = async (formData: Record<string, string>) => {
	// checking data
	const { email, password, captchaToken } = formData;

	const newUser = await supabase.auth.signUp({
		email,
		password,
		options: {
			captchaToken,
		},
	});

	if (newUser.error) {
		return handlerError(newUser.error.name, newUser.error.message, 400);
	}

	return hanldeData<User>(newUser.data.user as User);
};

export const signIn = async (formData: Record<string, string>) => {
	const { email, password, captchaToken } = formData;

	if (isEmpty(email) || isEmpty(password)) {
		return handlerError("Invalid data", "Please, fill fields", 400);
	}

	const session = await supabase.auth.signInWithPassword({
		email,
		password,
		options: {
			captchaToken,
		},
	});

	if (session.error) {
		return handlerError(session.error.name, session.error.message, 400);
	}

	return hanldeData<User>(session.data.user as User);
};

export const getUser = async () => {
	const { data, error } = await supabaseClient.auth.getSession();

	if (error) {
		// return handleRequest(null, { title: error.cause, message: error.message });
		return error;
	}

	return data;
};
