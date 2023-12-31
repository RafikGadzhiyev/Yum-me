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
				Cancel
			</button>
		</div>
	);
};