// TODO: tabs as object with some metadata

import { GeneratedFoodsTab } from "@/components/feature/GeneratedFoodsTab";
import { PostsTab } from "@/components/feature/PostsTab";
import { Roles } from "@/enums/roles.enum";
import { LikesTab } from "@/components/feature/LikesTab";

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
	// This tab is only accessible for doctors and admins
	{
		key: "POSTS",
		Component: PostsTab,
		roles: [Roles.ADMIN, Roles.DOCTOR],
	},
	{
		key: "GENERATED_FOODS",
		Component: GeneratedFoodsTab,
	},
	{
		key: "LIKES",
		Component: LikesTab,
	},
];