import "server-only";

export const getUser = async (user: any) => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL +
			"/api/health_data?email=" +
			user.data.user?.email
	);

	const { data } = await response.json();

	return data || {};
};
