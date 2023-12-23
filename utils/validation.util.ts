export const isEmpty = (str: string) => str.length === 0;

export const isConfigured = (userData: User | null) => {
	return (
		userData &&
		userData.age > 0 &&
		userData.weight > 0 &&
		userData.height > 0 &&
		userData.gender !== null
	);
};