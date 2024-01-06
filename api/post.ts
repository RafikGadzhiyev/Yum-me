import { databases, ID } from "@/lib/appwrite";

export const getPostList = async (queries: string[]) => {
	const requestResponse = await databases.listDocuments(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_POST_COLLECTION_ID!,
		queries,
	);

	const parsedDocuments: Post[] = [];

	for (const document of requestResponse.documents) {
		const parsedDocument = {
			...document,
			coverage: JSON.parse(document.coverage),
		};

		// TODO: fix this problem
		parsedDocuments.push(parsedDocument as any); //eslint-disable-line
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