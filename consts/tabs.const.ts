// TODO: tabs as object with some metadata

import { GeneratedFoodsTab } from "@/components/feature/GeneratedFoodsTab";
import { PostsTab } from "@/components/feature/PostsTab";

export const HOME_PAGE_TABS = [
	{
		key: "POSTS",
		Component: PostsTab,
	},
	{
		key: "GENERATED_FOODS",
		Component: GeneratedFoodsTab,
	},
];

export const PROFILE_PAGE_TABS = [
	{
		key: "POSTS",
		Component: PostsTab,
	},
	{
		key: "GENERATED_FOODS",
		Component: GeneratedFoodsTab,
	},
	{
		key: "LIKES",
		Component: null,
	},
];