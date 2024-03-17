// TODO: tabs as object with some metadata

import { $Enums } from "@prisma/client";
import { GeneratedFoodsTab } from "@/components/feature/GeneratedFoodsTab";
import { PostsTab } from "@/components/feature/PostsTab";
import { LikesTab } from "@/components/feature/LikesTab";
import { FC } from "react";

export const PROFILE_PAGE_TABS: {
	key: string;
	Component: FC<any>; // eslint-disable-line
	roles?: $Enums.Role[];
}[] = [
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
