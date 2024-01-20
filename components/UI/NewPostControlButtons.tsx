import { FC } from "react";

interface INewPostControlButtonsProps {
	createNewPost?: () => void;
	cancelNewPost?: () => void;

	content: string;
}

export const NewPostControlButtons: FC<INewPostControlButtonsProps> = ({
	createNewPost,
	cancelNewPost,
	content,
}) => {
	return (
		<div className="flex items-center gap-2">
			<button
				className="btn btn-success"
				onClick={createNewPost}
				disabled={!content.length}
			>
				Save
			</button>
			<button
				className="btn btn-error"
				onClick={cancelNewPost}
			>
				Cancel
			</button>
		</div>
	);
};