import {
	FaRegBookmark,
	FaRegComment,
	FaRegThumbsUp,
	FaThumbsUp,
} from "react-icons/fa";
import { FC } from "react";

interface IPostCoverageProps {
	postId: string;
	show_likes: boolean;
	updateCoverage: (coverageField: string) => void;
}

export const PostCoverage: FC<Post["coverage"] & IPostCoverageProps> = ({
	postId,
	likes,
	show_likes,
	comments,
	saved,
	updateCoverage,
}) => {
	return (
		<div className="flex items-center gap-2">
			<button
				className="flex items-center gap-1"
				onClick={() => updateCoverage("likes")}
			>
				{likes.includes(postId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
				{show_likes && <span>{likes.length}</span>}
			</button>

			<button className="flex items-center gap-1">
				<FaRegComment />
				<span>{comments.length}</span>
			</button>
			<button className="flex items-center gap-1">
				<FaRegBookmark />
				<span>{saved.length}</span>
				{/*<FaBookmark />*/}
			</button>
		</div>
	);
};