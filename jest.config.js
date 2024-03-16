/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	moduleNameMapper: {
		// if your using tsconfig.paths there is no harm in telling jest
		"@components/(.*)$": "<rootDir>/components/$1",
		"@/(.*)$": "<rootDir>/src/$1",

		// mocking assets and styling
		"^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__tests__/mocks/fileMock.ts",
		"^.+\\.(css|less|scss|sass)$": "<rootDir>/__tests__/mocks/styleMock.ts",
	},
	// to obtain access to the matchers.
	setupFilesAfterEnv: ["<rootDir>/__tests__/index.ts"],

	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	modulePaths: ["<rootDir>"],
	testEnvironment: "jsdom",
};
