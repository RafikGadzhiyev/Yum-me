import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		require("@headlessui/tailwindcss")({ prefix: "ui" }), // eslint-disable-line
		require("@tailwindcss/typography"),
		require("daisyui"),
	],

	daisyui: {
		themes: ["dark", "light", "retro"], // false = only light and dark
		darkTheme: "dark", // choosing on of the dark themes
		styled: true,
		utils: true, // add utils and responsive design
	},
};
export default config;