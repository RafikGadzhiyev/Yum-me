import { FC } from "react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import {
	FaRegBookmark,
	FaRegComment,
	FaRegThumbsUp,
	FaThumbsUp,
} from "react-icons/fa";
import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";

interface IPostProps {
	updatePost: <T>(field: string, value: T, isNew: boolean, postId: string) => void;
	isNew?: boolean;
	createNewPost?: () => void;
	cancelNewPost?: () => void;
}

export const Post: FC<Post & IPostProps> = ({
	$id,
	created_at,
	coverage,
	author,
	role,
	content,
	show_likes,
	isNew = false,

	createNewPost,
	cancelNewPost,
	updatePost,
}) => {
	const { i18n } = useTranslation();

	const updateLike = () => {
		const likes = new Set(coverage.likes);

		if (likes.has($id)) {
			likes.delete($id);
		} else {
			likes.add($id);
		}

		updatePost<Post["coverage"]>(
			"coverage",
			{ ...coverage, likes: Array.from(likes) },
			isNew,
			$id,
		);
	};

	return (
		<div
			key={$id}
			className="rounded-md bg-white p-4"
		>
			<div className="items center flex justify-start shadow-gray-400">
				<div className="flex flex-col">
					<span>{author}</span>
					<div className="-translate-y-1/4 text-sm text-gray-500">
						<span>{role}</span>
						<span>
							{" "}
							·{" "}
							{formatDistanceToNow(new Date(created_at), {
								addSuffix: true,
								locale: LOCALE_BY_LANGUAGE[i18n.language],
							})}
						</span>
					</div>
				</div>
			</div>
			<div className="my-2 max-h-[300px] overflow-y-auto rounded-sm border p-2">
				{isNew ? (
					<textarea
						className="min-h-[200px] w-full border-none outline-none"
						onChange={(e) => updatePost("content", e.target.value, isNew, $id)}
					></textarea>
				) : (
					content
				)}
			</div>
			<div className="flex items-center gap-2">
				<button
					className="flex items-center gap-1"
					onClick={updateLike}
				>
					{coverage.likes.includes($id) ? <FaThumbsUp /> : <FaRegThumbsUp />}
					{show_likes && <span>{coverage.likes.length}</span>}
				</button>

				<button className="flex items-center gap-1">
					<FaRegComment />
					<span>{coverage.comments.length}</span>
				</button>
				<button>
					<FaRegBookmark />
					{/*<FaBookmark />*/}
				</button>
			</div>

			{isNew && (
				<div className="flex items-center gap-2">
					<button
						className="mt-2 rounded-md bg-green-500 p-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-20"
						onClick={createNewPost}
						disabled={!content.length}
					>
						Save
					</button>
					<button
						className="mt-2 rounded-md bg-red-400 p-2 py-1 text-white"
						onClick={cancelNewPost}
					>
						{" "}
						Cancel
					</button>
				</div>
			)}
		</div>
	);
};