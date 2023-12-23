// TODO: Create logic
//! Important: this component is on test mode. Need refactor and more

import {
	FaThumbsUp,
	FaThumbsDown,
	FaComment,
	FaBookmark,
	FaRegBookmark,
	FaRegComment,
	FaRegThumbsUp,
	FaRegThumbsDown,
} from "react-icons/fa";
import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";
import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";

const TEST_DATA = [
	{
		id: 1,
		author: "Elon Musk",
		role: "surgeon",
		created_at: "2 days ago", // Here will be actual date
		showLikes: true,
		coverage: {
			likes: 10,
			dislikes: 45,
			comments: [{}, {}],
		},
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
\t\t\t\t\taspernatur assumenda aut beatae corporis, delectus deleniti doloremque
\t\t\t\t\texplicabo fuga fugit hic illo ipsa ipsum labore laudantium minima molestias
\t\t\t\t\tnam necessitatibus odit porro quis quisquam quo rem repudiandae sapiente
\t\t\t\t\tsed sit sunt tempora tempore, temporibus unde vitae, voluptas voluptate.
\t\t\t\t\tAt, deserunt! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
\t\t\t\t\tAliquam aspernatur assumenda aut beatae corporis, delectus deleniti
\t\t\t\t\tdoloremque explicabo fuga fugit hic illo ipsa ipsum labore laudantium
\t\t\t\t\tminima molestias nam necessitatibus odit porro quis quisquam quo rem
\t\t\t\t\trepudiandae sapiente sed sit sunt tempora tempore, temporibus unde vitae,
\t\t\t\t\tvoluptas voluptate. At, deserunt! Lorem ipsum dolor sit amet, consectetur
\t\t\t\t\tadipisicing elit. Aliquam aspernatur assumenda aut beatae corporis,
\t\t\t\t\tdelectus deleniti doloremque explicabo fuga fugit hic illo ipsa ipsum
\t\t\t\t\tlabore laudantium minima molestias nam necessitatibus odit porro quis
\t\t\t\t\tquisquam quo rem repudiandae sapiente sed sit sunt tempora tempore,
\t\t\t\t\ttemporibus unde vitae, voluptas voluptate. At, deserunt!`,
	},
	{
		id: 2,
		author: "Doctor Dre",
		role: "surgeon",
		created_at: "54 min ago", // Here will be actual date
		showLikes: true,
		coverage: {
			likes: 150342,
			dislikes: 2450,
			comments: Array(150).fill({}),
		},
		content: `Hello, everyone. Today I want to share with you with one interesting feature in medicine!`,
	},
	{
		id: 3,
		author: "Doctor Dre",
		role: "surgeon",
		created_at: "1 week ago", // Here will be actual date
		showLikes: false,
		coverage: {
			likes: 1504,
			dislikes: 20,
			comments: Array(15320).fill({}),
		},
		content: `Hello, everyone. Today I want to share with you with one interesting feature in medicine!`,
	},
];

export const PostsTab: FC<ITabProps> = ({ isEditable }) => {
	const [posts, setPosts] = useState(TEST_DATA);
	const [newPosts, setNewPosts] = useState<any[]>([]);

	const { i18n } = useTranslation();

	const user = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData
	);

	const createNewPost = () => {
		setNewPosts((prevNewPosts) => [
			{
				id: Math.random(),
				author: user.name + user.last_name,
				role: user.role,
				created_at: new Date(), // Here will be actual date
				showLikes: true,
				coverage: {
					likes: 0,
					dislikes: 0,
					comments: [],
				},
				content: "",
			},
			...prevNewPosts,
		]);
	};

	const updateNewPostField = (newPostIndex: number, field: string, value: any) => {
		setNewPosts((prevPosts) =>
			prevPosts.map((prevPost, i) =>
				i !== newPostIndex ? prevPost : { ...prevPost, [field]: value }
			)
		);
	};

	return (
		<div className="flex flex-col gap-3">
			{isEditable && <Button onClick={createNewPost}>New post</Button>}

			{newPosts.map((newPost, newPostIndex) => (
				<div
					key={newPost.id}
					className="bg-white p-4 rounded-md"
				>
					<div className="flex items center justify-start shadow-gray-400">
						<div className="flex flex-col">
							<span>{newPost.author}</span>
							<div className="text-gray-500 text-sm -translate-y-1/4">
								<span>{newPost.role}</span>
								<span>
									{" "}
									·{" "}
									{formatDistanceToNow(newPost.created_at, {
										locale: LOCALE_BY_LANGUAGE[i18n.language],
										addSuffix: true,
									})}
								</span>
							</div>
						</div>

						<div className="ml-auto flex items-center gap-3">
							<button className="flex items-center gap-1">
								<FaRegThumbsUp />
								{newPost.showLikes && <span>{newPost.coverage.likes}</span>}
								{/*<FaThumbsUp />*/}
							</button>
							<button className="flex items-center gap-1">
								<FaRegThumbsDown />
								{newPost.showLikes && <span>{newPost.coverage.dislikes}</span>}
								{/*<FaThumbsDown />*/}
							</button>
						</div>
					</div>
					<div className="border rounded-sm p-2 my-2 max-h-[300px] overflow-y-auto">
						{/*{newPost.content}*/}
						<textarea
							className="w-full"
							value={newPost.content}
							onChange={(e) =>
								updateNewPostField(newPostIndex, "content", e.target.value)
							}
						></textarea>
					</div>
					<div className="flex items-center gap-2">
						<button className="flex items-center gap-1">
							<FaRegComment />
							<span>{newPost.coverage.comments.length}</span>
							{/*<FaComment />*/}
						</button>
						<button>
							<FaRegBookmark />
							{/*<FaBookmark />*/}
						</button>
					</div>
				</div>
			))}

			{TEST_DATA.map((data) => (
				<div
					key={data.id}
					className="bg-white p-4 rounded-md"
				>
					<div className="flex items center justify-start shadow-gray-400">
						<div className="flex flex-col">
							<span>{data.author}</span>
							<div className="text-gray-500 text-sm -translate-y-1/4">
								<span>{data.role}</span>
								<span> · {data.created_at}</span>
							</div>
						</div>

						<div className="ml-auto flex items-center gap-3">
							<button className="flex items-center gap-1">
								<FaRegThumbsUp />
								{data.showLikes && <span>{data.coverage.likes}</span>}
								{/*<FaThumbsUp />*/}
							</button>
							<button className="flex items-center gap-1">
								<FaRegThumbsDown />
								{data.showLikes && <span>{data.coverage.dislikes}</span>}
								{/*<FaThumbsDown />*/}
							</button>
						</div>
					</div>
					<div className="border rounded-sm p-2 my-2 max-h-[300px] overflow-y-auto">
						{data.content}
					</div>
					<div className="flex items-center gap-2">
						<button className="flex items-center gap-1">
							<FaRegComment />
							<span>{data.coverage.comments.length}</span>
							{/*<FaComment />*/}
						</button>
						<button>
							<FaRegBookmark />
							{/*<FaBookmark />*/}
						</button>
					</div>
				</div>
			))}
		</div>
	);
};