export const handleException = (message: string, title?: string) => {
	if (!title) {
		title = "Server error";
	}

	return {
		title,
		message,
	};
};