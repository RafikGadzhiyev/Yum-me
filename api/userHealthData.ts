import "server-only"; // It is okay, but actually we can use without it. Need to think

export const getUserHealthData = async (user: any) => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL +
			"/api/health_data?email=" +
			user.data.user?.email
	);

	const { data } = await response.json();

	return data;
};