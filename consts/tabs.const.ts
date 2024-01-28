// TODO: tabs as object with some metadata

import { $Enums } from "@prisma/client";
import { GeneratedFoodsTab } from "@/components/feature/GeneratedFoodsTab";
import { PostsTab } from "@/components/feature/PostsTab";
import { LikesTab } from "@/components/feature/LikesTab";
import { FC, JSX } from "react";

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

export const PROFILE_PAGE_TABS: {
	key: string;
	Component: FC<any>; // eslint-disable-line
	roles?: $Enums.Role[];
}[] = [
	// This tab is only accessible for doctors and admins
	{
		key: "POSTS",
		Component: PostsTab,
		roles: [$Enums.Role.ADMIN, $Enums.Role.DOCTOR],
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
