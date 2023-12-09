import { FaHome, FaUser, FaBookmark, FaSearch } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export const ROUTES: Record<string, Route> = {
	HOME: {
		path: "/home",
		key: "home",
		label: "Home Page",
		withSearchParams: false,
		isDynamic: false,
		Icon: FaHome,

		getDynamicPath(){
			return this.path;
		},
	},
	PROFILE: {
		path: "/profile",
		key: "profile",
		label: "Profile Page",
		isDynamic: true,
		withSearchParams: false,
		Icon: FaUser,
		
		getDynamicPath(userId: string){
			return this.path + '/' + userId;
		},
	},
	SAVED_RECIPES: {
		path: "/saved-recipes",
		key: "saved_recipes",
		label: "Saved Recipes",
		isDynamic: false,
		withSearchParams: false,
		Icon: FaBookmark,

		getDynamicPath(){
			return this.path;
		},
	},
	SEARCH: {
		path: "/search",
		key: "search",
		label: "Search Page",
		isDynamic: false,
		withSearchParams: false,
		Icon: FaSearch,

		getDynamicPath(){
			return this.path;
		},
	},
	SETTINGS: {
		path: "/settings",
		key: "settings",
		label: "Settings Page",
		isDynamic: false,
		withSearchParams: false,
		Icon: FaGear,

		getDynamicPath(){
			return this.path;
		},
	},
};

// ? Возможно, это не нужно, но пусть стоит, чтобы ориентироваться по какому роуту авторизация идет
export const AUTH_ROUTES: Record<string, Route> = {
	SIGN_IN: {
		path: "/sign_in",
		key: "sign_in",
		label: "Sign in",
		isDynamic: false,
		withSearchParams: false,

		getDynamicPath(){
			return this.path;
		},
	},
	SIGN_UP: {
		path: "/sign_up",
		key: "sign_up",
		label: "Sign up",
		withSearchParams: false,
		isDynamic: false,

		getDynamicPath(){
			return this.path;
		},
	},
	EMAIL_VERIFICATION: {
		path: "/email_verification",
		key: "email_verification",
		label: "Email verification",
		withSearchParams: false,
		isDynamic: false,

		getDynamicPath(){
			return this.path;
		},
	},
};

export const ROUTE_LIST: Route[] = Object.values(ROUTES);
