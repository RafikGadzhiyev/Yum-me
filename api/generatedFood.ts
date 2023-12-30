import { databases, ID } from "@/lib/appwrite";

export const getGeneratedFoodList = async (queries: string[]) => {
	const requestResponse = await databases.listDocuments(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_FOOD_COLLECTION_ID!,
		queries,
	);

	return requestResponse.documents;
};

export const createGeneratedFood = async (request: GeneratedFoodRequestBody) => {
	return await databases.createDocument(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_FOOD_COLLECTION_ID!,
		ID.unique(),
		request,
	);
};