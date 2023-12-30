import { account, databases, ID } from "@/app/appwrite";
import { AppwriteException } from "appwrite";
import { handleException } from "@/utils/clientHandlers.util";
import { Roles } from "@/enums/roles.enum";
export const signUp = async (email: string, password: string) => {
	const signUpResult: RequestResponseWithSuccess<
		Awaited<ReturnType<typeof signIn>> | null,
		RequestError | null
	> = {
		success: false,
		data: null,
		error: null,
	};

	try {
		await account.create(ID.unique(), email, password);

		signUpResult.data = await signIn(email, password);
		signUpResult.success = true;
	} catch (err: unknown) {
		signUpResult.error = handleException(
			(err as AppwriteException).message,
			"Sign up error",
		);
		signUpResult.success = false;
	}

	return signUpResult;
};

export const signIn = async (email: string, password: string) => {
	try {
		await account.createEmailSession(email, password);

		// creating new record in database
		await databases.createDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
			ID.unique(),
			{
				email,
				role: Roles.USER,
			},
		);

		return await account.get();
	} catch (err) {
		console.error((err as AppwriteException).message);

		return null;
	}
};

export const signOut = async () => {
	await account.deleteSession("current");

	return null;
};