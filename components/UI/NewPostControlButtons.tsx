import { FC } from "react";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();

	return (
		<div className="flex items-center gap-2">
			<button
				className="btn btn-success"
				onClick={createNewPost}
				disabled={!content.length}
			>
				{t("SAVE")}
			</button>
			<button
				className="btn btn-error"
				onClick={cancelNewPost}
			>
				{t("CANCEL")}
			</button>
		</div>
	);
};
