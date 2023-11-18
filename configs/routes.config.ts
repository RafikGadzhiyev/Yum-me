import { FaHome, FaUser, FaBookmark, FaSearch } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export const ROUTES: Record<string, Route> = {
	HOME: {
		path: "/home",
		key: "home",
		label: "Home Page",
		Icon: FaHome,
	},
	PROFILE: {
		path: "/profile",
		key: "profile",
		label: "Profile Page",
		Icon: FaUser,
	},
	SAVED_RECIPES: {
		path: "/saved-recipes",
		key: "saved_recipes",
		label: "Saved Recipes",
		Icon: FaBookmark,
	},
	SEARCH: {
		path: "/search",
		key: "search",
		label: "Search Page",
		Icon: FaSearch,
	},
	SETTINGS: {
		path: "/settings",
		key: "settings",
		label: "Settings Page",
		Icon: FaGear,
	},
};

// ? ВОзможно, это не нужно, но пусть стоит, чтобы ориентироваться по какому роуту авторизация идет
export const AUTH_ROUTES: Record<string, Route> = {
	SIGN_IN: {
		path: "/sign_in",
		key: "sign_in",
		label: "Sign in",
	},
	SIGN_UP: {
		path: "/sign_up",
		key: "sign_up",
		label: "Sign up",
	},
	EMAIL_VERIFICATION: {
		path: "/email_verification",
		key: "email_verification",
		label: "Email verification",
	},
};

export const ROUTE_LIST: Route[] = Object.values(ROUTES);
