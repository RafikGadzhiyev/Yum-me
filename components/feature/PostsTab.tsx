import { FC, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { createPost, getPostList, updatePost } from "@/api/post";
import { Post } from "@/components/feature/Post";
import { useLoading } from "@/hooks/useLoading";
import { Loading } from "@/components/UI/Loading";

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

		setNewPost({
			$id: Math.random() + "",
			author: user.name + " " + user.last_name,
			role: user.role,
			created_at: new Date(), // Here will be actual date
			show_likes: true,
			coverage: {
				likes: [],
				saved: [],
				comments: [],
			},
			content: "",
		});
	};

	const updateNewPostField = async function <T>(
		field: string,
		value: T,
		isNew: boolean,
		postId: string,
	) {
		if (isNew) {
			setNewPost((prevPost) =>
				!prevPost
					? null
					: {
							...prevPost,
							[field]: value,
						},
			);
		} else {
			let post = posts.find((post) => post.$id === postId);

			if (!post) return;

			setPosts((prevPosts) =>
				prevPosts.map((prevPost) =>
					prevPost.$id === postId
						? {
								...prevPost,
								[field]: value,
							}
						: prevPost,
				),
			);

			post = {
				...post,
				[field]: value,
			};

			await updatePostRecord(post);
		}
	};

	const cancelNewPost = () => {
		setNewPost(null);
	};

	const createNewPostRecord = () => {
		if (!newPost) return;
		startLoading();
		const newPostRequestBody: PostRequestBody = {
			created_at: newPost.created_at,
			author: newPost.author,
			role: newPost.role,
			show_likes: newPost.show_likes,
			coverage: JSON.stringify(newPost.coverage),
			content: newPost.content,
		};

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
		await updatePost(post.$id, {
			author: post.author,
			role: post.role,
			created_at: post.created_at,
			show_likes: post.show_likes,
			coverage: JSON.stringify(post.coverage),
			content: post.content,
		});
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
					isEditable && <Button onClick={createNewPost}>New post</Button>
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