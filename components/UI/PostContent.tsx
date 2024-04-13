import { FC, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

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
	const [postContent, setPostContent] = useState(content || "");

	const onPostContentChanging = (e: ContentEditableEvent) => {
		const newPostContent = e.target.value;

		updatePost("content", newPostContent, isNew, postId);
		setPostContent(newPostContent);
	};

	return (
		<div className="my-2 max-h-[300px] overflow-y-auto rounded-sm  border border-neutral p-2">
			{isNew ? (
				<ContentEditable
					className="min-h-[200px] w-full border-none bg-transparent outline-none"
					html={postContent}
					disabled={false}
					onChange={onPostContentChanging}
				/>
			) : (
				// <textarea
				// 	className="min-h-[200px] w-full border-none bg-transparent outline-none"
				// 	onChange={(e) => updatePost("content", e.target.value, isNew, postId)}
				// ></textarea>

				<ContentEditable
					html={postContent}
					disabled={true}
					onChange={onPostContentChanging}
				/>
			)}
		</div>
	);
};
