import { Client, Databases } from "appwrite";

export const client = new Client();

client
	.setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL!)
	.setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

export const databases = new Databases(client);

export type DocumentList = Awaited<ReturnType<typeof databases.listDocuments>>;
export type Document = Omit<
	DocumentList["documents"][number],
	"$permissions" | "$updatedAt" | "$createdAt" | "$databaseId" | "$collectionId"
>;
