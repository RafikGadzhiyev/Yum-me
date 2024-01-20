import { databases, ID } from "@/lib/appwrite";
import { Models } from "appwrite";

export const getPostList = async (queries: string[]) => {
	const KEYS_FOR_REMOVE = ["$collectionId", "$databaseId", "$permissions"];

	const requestResponse = await databases.listDocuments(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_POST_COLLECTION_ID!,
		queries,
	);

	const parsedDocuments: Post[] = [];

	for (const document of requestResponse.documents) {
		const parsedDocument: Record<string, any> = {
			...document,
			coverage: JSON.parse(document.coverage),
		};

		const preparedDocument = {} as Record<string, any>;

		for (let key of Object.keys(parsedDocument)) {
			if (KEYS_FOR_REMOVE.includes(key)) {
				continue;
			}

			preparedDocument[key] = parsedDocument[key];
		}

		// TODO: fix this problem
		parsedDocuments.push(preparedDocument as any); //eslint-disable-line
	}

	return parsedDocuments.reverse();
};

export const createPost = async (request: PostRequestBody) => {
	return await databases.createDocument(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_POST_COLLECTION_ID!,
		ID.unique(),
		request,
	);
};

export const updatePost = async (
	postId: string,
	updatedData: Partial<PostRequestBody>,
) => {
	await databases.updateDocument(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_POST_COLLECTION_ID!,
		postId,
		updatedData,
	);
};