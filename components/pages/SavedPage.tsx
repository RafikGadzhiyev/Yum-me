"use client";

import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components/UI/Loading";
import { useEffect, useState } from "react";
import { Post } from "@/components/feature/Post";

export const SavedPage = () => {
	const userId = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user?.id,
	);
	const { isLoading, sendRequest } = useFetch();

	const [savedPosts, setSavedPosts] = useState<Post[]>([]);

	useEffect(() => {
		sendRequest("GET", `/api/post/user_saved?userId=${userId}`).then(
			(newSavedPosts) => setSavedPosts(newSavedPosts),
		);
	}, [userId]);

	return (
		<>
			<div>
				<div>
					{savedPosts.map((savedPost) => (
						<div
							key={savedPost.id}
							className="mb-3"
						>
							<Post
								$userId={savedPost?.authorId}
								authorEmail={
									savedPost?.author.name + " " + savedPost?.author.lastName
								}
								updatePost={() => {}}
								readOnly={true}
								{...savedPost}
							/>
						</div>
					))}
				</div>
			</div>
			{isLoading && <Loading />}
		</>
	);
};
