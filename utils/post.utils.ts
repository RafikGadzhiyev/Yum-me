export const updatePostLikes = (likes: string[], userId: string) => {
	const uniqueLikes = new Set(likes);

	if (uniqueLikes.has(userId)) {
		uniqueLikes.delete(userId);
	} else {
		uniqueLikes.add(userId);
	}

	return Array.from(uniqueLikes);
};