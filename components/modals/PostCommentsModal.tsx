import { FaRegComment } from "react-icons/fa";
import { FC, FormEvent, useRef, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { RootStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { getUserFullName } from "@/utils/post.utils";
import { formatDistanceToNow } from "date-fns";
import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";
import i18n from "i18next";

interface IPostCommentsModalProps {
	postId: string;
	comments: Post["comments"];
}

export const PostCommentsModal: FC<IPostCommentsModalProps> = ({
	postId,
	comments: commentList,
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const userData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user,
	);
	const [comments, setComments] = useState(commentList);

	const addNewPostComment = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputRef.current || !userData) return;

		const newPostComment: PostComment = {
			id: uuid4(),
			content: inputRef.current.value,
			author: getUserFullName(userData as User),
			email: userData.email,
			createdAt: new Date(),
			replies: [],
		};

		inputRef.current.value = "";

		setComments((prevComments) => [...prevComments, newPostComment]);

		const updatePostResponse = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + "/api/post",
			{
				method: "PATCH",
				body: JSON.stringify({
					searchQuery: {
						id: postId,
					},
					fieldsToUpdate: {
						comments: [...comments, newPostComment],
					},
				}),
			},
		);

		const { data: updatedPost } = await updatePostResponse.json();

		setComments(updatedPost.comments);
	};

	return (
		<>
			<label
				className="flex items-center gap-1"
				htmlFor="comments_modal"
			>
				{/*TODO: RENAME*/}
				<FaRegComment />
				<span>{comments.length}</span>
			</label>

			<input
				type="checkbox"
				id="comments_modal"
				className="modal-toggle"
			/>

			<div
				className="modal"
				role="dialog"
			>
				<div className="modal-box">
					<h3 className="text-lg font-bold">Comments</h3>

					<div className="mt-5 max-h-[75vh] overflow-y-auto">
						{comments.length ? (
							<div>
								{comments.map((comment) => (
									<div
										key={comment.id}
										className="my-5 rounded-md bg-slate-200 px-3 py-1"
									>
										<div className="items center flex justify-between">
											<h1 className="text-xl font-bold">{comment.author}</h1>
											<span>
												{formatDistanceToNow(new Date(comment.createdAt), {
													addSuffix: true,
													locale: LOCALE_BY_LANGUAGE[i18n.language],
												})}
											</span>
										</div>
										<span className="text-gray-400">{comment.content}</span>
									</div>
								))}
							</div>
						) : (
							<div className="flex h-72 w-full flex-col items-center justify-center">
								<RiErrorWarningLine
									size={70}
									color="gray"
								/>
								<h1 className="text-xl font-bold text-gray-400">No comments</h1>
							</div>
						)}
					</div>

					<div>
						<form
							className="relative flex w-full items-center"
							onSubmit={addNewPostComment}
						>
							<input
								ref={inputRef}
								className="input input-bordered w-full bg-base-300"
							/>
							<button className="absolute right-3 z-30 cursor-pointer text-gray-400 hover:text-black">
								Send
							</button>
						</form>
					</div>
				</div>
				<label
					htmlFor="comments_modal"
					className="modal-backdrop"
				/>
			</div>
		</>
	);
};
