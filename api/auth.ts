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
		};
	}
};

export const signIn = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userSession) => {
			return userSession.user;
		})
		.catch((sessionError) => {
			return {
				code: sessionError.code,
				message: sessionError.message,
			};
		});
};

export const signOut = () => {
	return firebaseSignOut(auth)
		.then(() => true)
		.catch(() => false);
};
