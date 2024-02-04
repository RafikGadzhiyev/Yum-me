"use client";

import { RootStore } from "@/redux/store";

import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";

import { isConfigured } from "@/utils/validation.util";
import { PostsTab } from "@/components/feature/PostsTab";
import { NotConfiguredHealthData } from "@/components/UI/NotConfiguredHealthData";

export const HomePage = () => {
	const userHealthData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user,
	);

	const { responseStatus } = useFetch();

	return (
		<div className=" flex flex-col gap-2">
			{!isConfigured(userHealthData) ? (
				<NotConfiguredHealthData />
			) : (
				<div>
					<PostsTab
						state={responseStatus}
						isEditable={true}
					/>
				</div>
			)}
		</div>
	);
};
