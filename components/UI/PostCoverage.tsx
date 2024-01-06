import { FaRegBookmark, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { FC } from "react";
import { PostCommentsModal } from "@/components/modals/PostCommentsModal";

interface IPostCoverageProps {
	postId: string;
	show_likes: boolean;
	updateCoverage: (coverageField: string) => void;
	coverage: Post["coverage"];
}

export const PostCoverage: FC<IPostCoverageProps> = ({
	postId,
	show_likes,
	updateCoverage,
	coverage,
}) => {
	return (
		<div className="flex items-center gap-2">
			<button
				className="flex items-center gap-1"
				onClick={() => updateCoverage("likes")}
			>
				{coverage.likes.includes(postId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
				{show_likes && <span>{coverage.likes.length}</span>}
			</button>

			<PostCommentsModal
				postId={postId}
				coverage={coverage}
			/>
			{/*<button className="flex items-center gap-1">*/}
			{/*	<FaRegComment />*/}
			{/*	<span>{comments.length}</span>*/}
			{/*</button>*/}
			<button className="flex items-center gap-1">
				<FaRegBookmark />
				<span>{coverage.saved.length}</span>
				{/*<FaBookmark />*/}
			</button>
		</div>
	);
};