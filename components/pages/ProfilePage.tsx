"use client";

import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { RootStore } from "@/redux/store";
import { ProfilePageHeader } from "@/components/UI/ProfilePageHeader";
import { ProfilePageMain } from "@/components/feature/ProfilePageMain";
import { AnotherUserProfile } from "@/components/feature/AnotherUserProfile";
import { Loading } from "@/components/UI/Loading";

export const ProfilePageWrapper = () => {
	const { t } = useTranslation();

	const searchParams = useSearchParams();
	const userFromStore = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user,
	);

	const activeTab = searchParams.get("tab") as string;
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
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Loading />
			</div>
		);
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
