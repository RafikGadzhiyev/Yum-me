"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { RootStore } from "@/redux/store";
import { ProfilePageHeader } from "@/components/UI/ProfilePageHeader";
import { ProfilePageMain } from "@/components/feature/ProfilePageMain";
import { AnotherUserProfile } from "@/components/feature/AnotherUserProfile";

export const ProfilePageWrapper = () => {
	const searchParams = useSearchParams();
	const userFromStore = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);

	const activeTab = +(searchParams.get("tab") as string) || 0;
	const userId = searchParams.get("id");

	if (userId) {
		return (
			// Todo: Create fallback skeleton
			<Suspense fallback={<h1>Loading. . . .</h1>}>
				<AnotherUserProfile $id={userId} />
			</Suspense>
		);
	}

	if (!userFromStore) {
		return <h1>Wait, it Takes few minutes</h1>;
	}

	return (
		<div>
			<ProfilePageHeader user={userFromStore as User} />
			<ProfilePageMain
				activeTab={activeTab}
				user={userFromStore as User}
			/>
		</div>
	);
};
