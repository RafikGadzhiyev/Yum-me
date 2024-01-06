"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { RootStore } from "@/redux/store";
import { Query, Document } from "@/lib/appwrite";
import { getSession } from "@/api/auth";
import { getUsers } from "@/api/user";
import { ProfilePageHeader } from "@/components/UI/ProfilePageHeader";
import { ProfilePageMain } from "@/components/feature/ProfilePageMain";

export const ProfilePageWrapper = () => {
	const searchParams = useSearchParams();
	const userFromStore = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);

	const [user, setUser] = useState<Document | null>(userFromStore);

	const activeTab = +(searchParams.get("tab") as string) || 0;

	useEffect(() => {
		getSession().then((user) => {
			getUsers([Query.equal("email", user.email)]).then((users) => {
				setUser(users[0]);
			});
		});
	}, []);

	if (!user) {
		return <h1>Wait, it Takes few minutes</h1>;
	}

	return (
		<div>
			<ProfilePageHeader user={user as User} />
			<ProfilePageMain
				activeTab={activeTab}
				user={user as User}
			/>
		</div>
	);
};