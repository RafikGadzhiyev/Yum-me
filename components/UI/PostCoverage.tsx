import {
	FaBookmark,
	FaRegBookmark,
	FaRegThumbsUp,
	FaThumbsUp,
} from "react-icons/fa";
import { FC } from "react";
import { PostCommentsModal } from "@/components/modals/PostCommentsModal";

interface IPostCoverageProps {
	$userId: string;
	postId: string;
	show_likes: boolean;
	updateCoverage: (coverageField: string) => void;
	likes: Post["likes"];
	comments: Post["comments"];
	savedBy: Post["savedBy"];
}

export const PostCoverage: FC<IPostCoverageProps> = ({
	$userId,
	postId,
	show_likes,
	updateCoverage,
	likes,
	comments,
	savedBy,
}) => {
	return (
		<div className="flex items-center gap-2">
			<button
				className="flex items-center gap-1"
				onClick={() => updateCoverage("likes")}
			>
				{likes.includes($userId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
				{show_likes && <span>{likes.length}</span>}
			</button>

			<PostCommentsModal
				key={postId}
				postId={postId}
				comments={comments}
			/>

			<button
				className="flex items-center gap-1"
				onClick={() => updateCoverage("savedBy")}
			>
				{savedBy.includes($userId) ? <FaBookmark /> : <FaRegBookmark />}
				<span>{savedBy.length}</span>
			</button>
		</div>
	);
};
