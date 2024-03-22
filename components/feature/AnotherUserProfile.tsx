"use client";

import { FC, useEffect, useState } from "react";
import { ProfilePageHeader } from "@/components/UI/ProfilePageHeader";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { updateUser } from "@/redux/slices/user.slice";
import { useFetch } from "@/hooks/useFetch";

interface IAnotherUserProfile {
	$id: string;
}

export const AnotherUserProfile: FC<IAnotherUserProfile> = ({ $id }) => {
	const { isLoading, sendRequest } = useFetch();
	const dispatch = useDispatch();
	const router = useRouter();
	const [user, setUser] = useState<null | User>(null);

	const currentUser = JSON.parse(
		JSON.stringify(
			useSelector((store: RootStore) => store.userHealthDataReducer.user),
		),
	);

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/user?id=${$id}`).then(
			(response) => {
				response.json().then(({ data: user }) => setUser(user));
			},
		);
	}, [$id]);

	if (currentUser?.id === $id) {
		router.replace("/profile");
	}

	if (!user) {
		return <h1>Loading . . .</h1>;
	}

	const subscribe = () => {
		sendRequest(
			"PATCH",
			"/api/user/subscribe",
			{
				userId: currentUser?.id,
				subscriberId: $id,
			},
			{
				"Content-Type": "application/json",
			},
		).then(() => {
			if (!currentUser) return;

			currentUser.subscribers.push($id);

			dispatch(updateUser(currentUser));
		});
	};

	const unsubscribe = () => {
		sendRequest(
			"PATCH",
			`/api/user/unsubscribe`,
			{
				userId: currentUser?.id,
				subscriberId: $id,
			},
			{
				"Content-Type": "application/json",
			},
		).then(() => {
			if (!currentUser) return;

			currentUser.subscribers = currentUser.subscribers.filter(
				(s: string) => s !== $id,
			);

			dispatch(updateUser(currentUser));
		});
	};

	return (
		<div>
			<button
				className="btn"
				onClick={() => router.back()}
			>
				Go back
			</button>
			<ProfilePageHeader user={user as User} />
			<div className="flex items-center justify-center gap-3">
				{!currentUser?.subscribers.includes($id) ? (
					<button
						className="btn btn-success"
						onClick={subscribe}
						disabled={isLoading}
					>
						{isLoading ? (
							<span className="loading loading-spinner"></span>
						) : (
							<span>Subscribe</span>
						)}
					</button>
				) : (
					<button
						className="btn btn-error"
						onClick={unsubscribe}
						disabled={isLoading}
					>
						{isLoading ? (
							<span className="loading loading-spinner"></span>
						) : (
							<span>Unsubscribe</span>
						)}
					</button>
				)}
			</div>
		</div>
	);
};
