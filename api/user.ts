//? Maybe then->catch->finally?
import { databases } from "@/lib/appwrite";

export const getUsers = async (queries: string[]) => {
	const requestResult = await databases.listDocuments(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
		queries,
	);

	return requestResult.documents;
};

export const updateUser = async (userId: string, updatedData: string) => {
	return await databases.updateDocument(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
		userId,
		updatedData,
	);
};