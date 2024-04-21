import { v4 as uuid4 } from "uuid";

export const getNewPost = (user: User): Post => {
	return {
		id: uuid4(),
		updatedAt: new Date(),
		authorId: user.id,
		author: user,
		role: user.role,
		createdAt: new Date(),
		showLikes: true,
		content: "",
		likes: [],
		savedBy: [],
		comments: [],
	};
};

export const updateNewPost = function <T>(
	newPost: Post | null,
	field: string,
	value: T,
) {
	if (!newPost) {
		return newPost;
	}

	return {
		...newPost,
		[field]: value,
	};
};

export const updatePostInPostList = function <T>(
	postList: Post[],
	postId: string,
	field: string,
	value: T,
) {
	return postList.map((post) =>
		post.id === postId
			? {
					...post,
					[field]: value,
				}
			: post,
	);
};

export const updatePostLikes = (likes: string[], userId: string) => {
	const uniqueLikes = new Set(likes);

	if (uniqueLikes.has(userId)) {
		uniqueLikes.delete(userId);
	} else {
		uniqueLikes.add(userId);
	}

	return Array.from(uniqueLikes);
};

export const updatePostSaved = (saved: string[], userId: string) => {
	const uniqueSaved = new Set(saved);

	if (uniqueSaved.has(userId)) {
		uniqueSaved.delete(userId);
	} else {
		uniqueSaved.add(userId);
	}

	return Array.from(uniqueSaved);
};

export const getUserFullName = (user: User) => user.name + " " + user.lastName;
