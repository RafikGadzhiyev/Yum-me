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
		isDynamic: true,
		withSearchParams: false,
		Icon: FaUser,

		getDynamicPath(userId: string) {
			return this.path + "/" + userId;
		},
	},
	SAVED_RECIPES: {
		path: "/saved",
		key: "saved_recipes",
		label: "Saved",
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
		withSearchParams: false,
		Icon: FaGear,
	},
};

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
		path: "/confirm_email",
		key: "confirm_email",
		label: "Confirm Email",
	},
};

export const ROUTE_LIST: Route[] = Object.values(ROUTES);