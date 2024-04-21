import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { Post } from "@/components/feature/Post";
import { Loading } from "@/components/UI/Loading";
import { getNewPost, updateNewPost, updatePostInPostList } from "@/utils/post.utils";
import { useFetch } from "@/hooks/useFetch";

export const PostsTab: FC<ITabProps> = ({ isEditable }) => {
	const { isLoading, sendRequest } = useFetch();
	const { t } = useTranslation();

	const [posts, setPosts] = useState<Post[]>([]);
	const [newPost, setNewPost] = useState<Post | null>(null);

	const user = useSelector((store: RootStore) => store.userHealthDataReducer.user);

	const createNewPost = () => {
		if (!user) {
			return;
		}

		const newPost = getNewPost(user as User);

		setNewPost(newPost);
	};

	const updateNewPostField = async function <T>(
		field: string,
		value: T,
		isNew: boolean,
		postId: string,
	) {
		if (isNew) {
			setNewPost((prevPost) => updateNewPost(prevPost, field, value));
		} else {
			const updatedPostList = updatePostInPostList(posts, postId, field, value);
			setPosts(() => updatedPostList);

			const post: Post | undefined = updatedPostList.find(
				(post) => post.id === postId,
			);

			if (!post) return;

			await updatePostRecord(post);
		}
	};

	const cancelNewPost = () => {
		setNewPost(null);
	};

	const createNewPostRecord = async () => {
		if (!newPost || !user) return;

		const newPostResponse = await sendRequest(
			"POST",
			"/api/post",
			{
				authorId: user.id,
				showLikes: newPost.showLikes,
				content: newPost.content,
			},
			{
				"Content-Type": "application/json",
			},
		);

		setPosts((prevPosts) => [...prevPosts, newPostResponse]);
		setNewPost(null);
	};

	const updatePostRecord = async (post: Post) => {
		const searchQuery = {
			id: post.id,
		};

		await sendRequest(
			"PATCH",
			"/api/post",
			{
				searchQuery,
				fieldsToUpdate: post,
			},
			{
				"Content-Type": "application/json",
			},
			{
				withoutLoading: true,
				cancelable: false,
			},
		);
	};

	useEffect(() => {
		sendRequest("GET", "/api/post").then((posts) => setPosts(posts));
	}, [sendRequest]);

	return (
		<>
			<div className="flex flex-col gap-3">
				{newPost ? (
					<Post
						{...newPost}
						authorEmail={user?.email}
						$userId={user?.id}
						isNew={true}
						updatePost={updateNewPostField}
						createNewPost={createNewPostRecord}
						cancelNewPost={cancelNewPost}
					/>
				) : (
					isEditable && (
						<button
							className="btn btn-ghost"
							onClick={createNewPost}
						>
							{t("NEW_POST")}
						</button>
					)
				)}

				{posts.map((data) => (
					<Post
						key={data.id}
						$userId={user?.id}
						authorEmail={data?.author.name + " " + data?.author.lastName}
						updatePost={updateNewPostField}
						{...data}
					/>
				))}
			</div>
			{isLoading && <Loading />}
		</>
	);
};
