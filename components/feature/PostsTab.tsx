import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { Post } from "@/components/feature/Post";
import { useLoading } from "@/hooks/useLoading";
import { Loading } from "@/components/UI/Loading";
import { getNewPost, updateNewPost, updatePostInPostList } from "@/utils/post.utils";

export const PostsTab: FC<ITabProps<Post>> = ({ isEditable }) => {
	const { startLoading, stopLoading, isLoading } = useLoading();
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
		startLoading();

		const newPostResponse = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + "/api/post",
			{
				method: "POST",
				body: JSON.stringify({
					authorId: user.id,
					showLikes: newPost.showLikes, // TODO: fix typo
					content: newPost.content,
				}),
			},
		);

		const { data } = await newPostResponse.json();

		console.log(data);

		setPosts((prevPosts) => [...prevPosts, data]);
		setNewPost(null);

		stopLoading();
	};

	const updatePostRecord = async (post: Post) => {
		const searchQuery = {
			id: post.id,
		};

		const updatePostResponse = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + "/api/post",
			{
				method: "PATCH",
				body: JSON.stringify({
					searchQuery,
					fieldsToUpdate: post,
				}),
			},
		);

		const updatedPost = await updatePostResponse.json();

		console.log(updatedPost);
		// await updatePost(post.id, constructPostRecord(post));
	};

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/post").then((postsResponse) => {
			postsResponse.json().then(({ data: posts }) => {
				setPosts(posts);
			});
		});
	}, []);

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
							New post
						</button>
					)
				)}

				{posts.map((data) => (
					<Post
						$userId={user?.id}
						authorEmail={user?.email}
						key={data.id}
						updatePost={updateNewPostField}
						{...data}
					/>
				))}
			</div>
			{isLoading && <Loading />}
		</>
	);
};
