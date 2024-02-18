"use client";

import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components/UI/Loading";
import { useEffect, useState } from "react";

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
							className="card my-3"
						>
							<div className="card-body rounded-md bg-base-200">
								<div className="flex flex-col px-3 text-base-content text-opacity-40">
									<span>Post id: ${savedPost.id}</span>
									<span>Author id: ${savedPost.authorId}</span>
								</div>

								<div className="rounded-sm bg-base-300 px-3 py-2">
									{savedPost.content}
								</div>

								<div className="flex gap-5 px-3 text-base-content text-opacity-40">
									<span>Likes: {savedPost.likes.length}</span>
									<span>Comments: {savedPost.comments.length}</span>
									<span>SavedCount: {savedPost.savedBy.length}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{isLoading && <Loading />}
		</>
	);
};
