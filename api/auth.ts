import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firabase";
import { AuthError } from "@firebase/auth";

export const signUp = async (email: string, password: string) => {
	try {
		const userSignUpResult = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);

		return userSignUpResult.user;
	} catch (err: unknown) {
		return {
			code: (err as AuthError).code,
			message: (err as AuthError).message,
		} as AuthLiteError;
	}
};

export const signIn = async (email: string, password: string) => {
	try {
		const authData = await signInWithEmailAndPassword(auth, email, password);

		return authData.user;
	} catch (err) {
		return {
			code: (err as AuthError).code,
			message: "Invalid credentials",
		} as AuthLiteError;
	}
};

export const signOut = async () => {
	await firebaseSignOut(auth);
};
