import "server-only";

export const isDevMode = () => {
	return process.env.NODE_ENV === "development";
};

export const isProduction = () => {
	return process.env.NODE_ENV === "production";
};

export const isTestMode = () => {
	return process.env.NODE_ENV === "test";
};
