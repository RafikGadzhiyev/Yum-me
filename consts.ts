export const APP_PAGE_LINK_LIST = [
	{
		key: "home",
		path: "/main",
		isDynamicPage: false,
		label: "Home",
	},
	{
		key: "search",
		path: "/search",
		isDynamicPage: false,
		label: "Search",
	},
	{
		key: "saved_recipes",
		path: "/saved",
		isDynamicPage: false,
		label: "Saved recipes",
	},
	// TODO: Change path
	{
		key: "profile",
		path: "/profile",
		// path: (dynamicPathPart: string) => `/profile`, // What we need,
		isDynamicPage: true,
		label: "Profile",
	},
	{
		key: "settings",
		path: "/settings",
		isDynamicPage: false,
		label: "Settings",
	},
];
