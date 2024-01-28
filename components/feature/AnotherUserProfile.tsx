"use client";

import { FC, useEffect, useState } from "react";
import { ProfilePageHeader } from "@/components/UI/ProfilePageHeader";
import { useRouter } from "next/navigation";

interface IAnotherUserProfile {
	$id: string;
}

export const AnotherUserProfile: FC<IAnotherUserProfile> = ({ $id }) => {
	const router = useRouter();
	const [user, setUser] = useState<null | User>(null);

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/user?id=${$id}`).then(
			(response) => {
				response.json().then(({ data: user }) => setUser(user));
			},
		);
	}, [$id]);

	if (!user) {
		return <h1>Loading . . .</h1>;
	}

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
				<button className="btn">Subscribe</button>
				<button className="btn">Message</button>
			</div>
		</div>
	);
};
