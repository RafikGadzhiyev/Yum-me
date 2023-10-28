export const ROUTES: Record<string, Route> = {
	HOME: {
		path: "/home",
		key: "home",
		label: "Home Page",
	},
	PROFILE: {
		path: "/profile",
		key: "profile",
		label: "Profile Page",
	},
	SAVED_RECIPES: {
		path: "/saved-recipes",
		key: "saved_recipes",
		label: "Saved Recipes",
	},
	SEARCH: {
		path: "/search",
		key: "search",
		label: "Search Page",
	},
	SETTINGS: {
		path: "/settings",
		key: "settings",
		label: "Settings Page",
	},
};

export const ROUTE_LIST: Route[] = Object.values(ROUTES);
