"use client";

import { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";

import { useDispatch } from "react-redux";
import { useFetch } from "@/hooks/useFetch";

import { readUser } from "@/redux/slices/user.slice";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

import { Query, UserActiveSession, Document } from "@/lib/appwrite";
import { isConfigured } from "@/utils/validation.util";
import { getSession } from "@/api/auth";
import { getUsers } from "@/api/user";
import { PostsTab } from "@/components/feature/PostsTab";
import { NotConfiguredHealthData } from "@/components/UI/NotConfiguredHealthData";

export const HomePage = () => {
	const [userSession, setUserSession] = useState<null | UserActiveSession>(null);
	const [userHealthData, setUserHealthData] = useState<null | Document>(null);

	const dispatch = useDispatch<AppDispatch>();

	const { responseStatus } = useFetch();

	useEffect(() => {
		dispatch(readUser(userSession));
	}, [userSession, dispatch]);

	useEffect(() => {
		dispatch(readUserHealthData(userHealthData));
	}, [userHealthData, dispatch]);

	useEffect(() => {
		getSession().then((userSession) => {
			setUserSession(userSession);

			getUsers([Query.equal("email", userSession.email)]).then((users) => {
				setUserHealthData(users[0]);
			});
		});
	}, []);

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