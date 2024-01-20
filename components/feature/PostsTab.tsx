import { FC, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { createPost, getPostList, updatePost } from "@/api/post";
import { Post } from "@/components/feature/Post";
import { useLoading } from "@/hooks/useLoading";
import { Loading } from "@/components/UI/Loading";
import {
	constructPostRecord,
	getNewPost,
	updateNewPost,
	updatePostInPostList,
} from "@/utils/post.utils";

export const PostsTab: FC<ITabProps<Post>> = ({ isEditable }) => {
	const { startLoading, stopLoading, isLoading } = useLoading();
	const [posts, setPosts] = useState<Post[]>([]);
	const [newPost, setNewPost] = useState<Post | null>(null);

	const user = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);

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
			setPosts((prevPosts) => updatedPostList);

			let post: Post | undefined = updatedPostList.find(
				(post) => post.$id === postId,
			);

			if (!post) return;

			await updatePostRecord(post);
		}
	};

	const cancelNewPost = () => {
		setNewPost(null);
	};

	const createNewPostRecord = () => {
		if (!newPost) return;
		startLoading();
		const newPostRequestBody = constructPostRecord(newPost, true) as PostRequestBody;

		// This tmp fix waiting solution from appwrite
		createPost(newPostRequestBody)
			.then(
				(
					createdNewPost: any, // eslint-disable-line
				) => {
					createdNewPost.coverage = JSON.parse(createdNewPost.coverage);

					setPosts((prevPosts) => [createdNewPost, ...prevPosts]);
					setNewPost(null);
				},
			)
			.finally(stopLoading);
	};

	const updatePostRecord = async (post: Post) => {
		await updatePost(post.$id, constructPostRecord(post));
	};

	useEffect(() => {
		getPostList([]).then((postList: Post[]) => setPosts(postList));
	}, []);

	return (
		<>
			<div className="flex flex-col gap-3">
				{newPost ? (
					<Post
						{...newPost}
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
						key={data.$id}
						updatePost={updateNewPostField}
						{...data}
					/>
				))}
			</div>
			{isLoading && <Loading />}
		</>
	);
};