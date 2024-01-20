import { FC } from "react";

interface IPostContentProps {
	isNew: boolean;
	postId: string;
	content: string;
	updatePost: <T>(field: string, value: T, isNew: boolean, postId: string) => void;
}

export const PostContent: FC<IPostContentProps> = ({
	isNew,
	postId,
	content,
	updatePost,
}) => {
	return (
		<div className="my-2 max-h-[300px] overflow-y-auto rounded-sm  border border-base-content p-2">
			{isNew ? (
				<textarea
					className="min-h-[200px] w-full border-none bg-transparent outline-none"
					onChange={(e) => updatePost("content", e.target.value, isNew, postId)}
				></textarea>
			) : (
				content
			)}
		</div>
	);
};