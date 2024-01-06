import { ID, UserActiveSession } from "@/lib/appwrite";

export const updatePostLikes = (likes: string[], userId: string) => {
	const uniqueLikes = new Set(likes);

	if (uniqueLikes.has(userId)) {
		uniqueLikes.delete(userId);
	} else {
		uniqueLikes.add(userId);
	}

	return Array.from(uniqueLikes);
};

export const updatePostComments = (
	comments: PostComment[],
	author: string,
	email: string,
	newCommentContent: string,
) => {
	const newComment: PostComment = {
		id: ID.unique(),
		content: newCommentContent,
		replies: [],
		created_at: new Date(),

		author,
		email,
	};

	comments.push(newComment);

	return newComment;
};

export const getUserFullName = (user: User) => user.name + " " + user.last_name;