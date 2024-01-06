import { v4 as uuid4 } from "uuid";

export const getNewPost = (user: User): Post => {
	return {
		$id: uuid4(),
		author: getUserFullName(user),
		role: user.role,
		created_at: new Date(),
		show_likes: true,
		content: "",
		coverage: {
			likes: [],
			saved: [],
			comments: [],
		},
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

export const constructPostRecord = (updatedPost: Post) => {
	let constructedPostRecord: Partial<PostRequestBody> = {};

	for (const [field, value] of Object.entries(updatedPost)) {
		let processedValue = value;

		if (field === "coverage") {
			processedValue = JSON.stringify(value);
		}

		// FIXME: should be solution
		constructedPostRecord = {
			...constructedPostRecord,
			[field]: processedValue,
		};
	}

	return constructedPostRecord;
};

export const updatePostInPostList = function <T>(
	postList: Post[],
	postId: string,
	field: string,
	value: T,
) {
	return postList.map((post) =>
		post.$id === postId
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

export const updatePostComments = (
	comments: PostComment[],
	author: string,
	email: string,
	newCommentContent: string,
) => {
	const newComment: PostComment = {
		id: uuid4(),
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