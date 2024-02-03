import { FC } from "react";
import { PostCoverage } from "@/components/UI/PostCoverage";
import { NewPostControlButtons } from "@/components/UI/NewPostControlButtons";
import { PostContent } from "@/components/UI/PostContent";
import { PostHeader } from "@/components/UI/PostHeader";
import { updatePostLikes, updatePostSaved } from "@/utils/post.utils";

interface IPostProps {
	$userId: string;
	updatePost: <T>(field: string, value: T, isNew: boolean, postId: string) => void;
	isNew?: boolean;
	createNewPost?: () => void;
	cancelNewPost?: () => void;
	authorEmail: string;
}

// TODO: REFACTOR

export const Post: FC<Post & IPostProps> = ({
	id,
	$userId,
	createdAt,
	likes,
	comments,
	savedBy,
	role,
	content,
	showLikes,
	authorEmail,
	isNew = false,

	createNewPost,
	cancelNewPost,
	updatePost,
}) => {
	const updateLike = () => {
		const updatedLikes = updatePostLikes(likes, $userId);

		updatePost<Post["likes"]>("likes", updatedLikes, isNew, id);
	};

	const updateSaved = async () => {
		const updatedSaved = updatePostSaved(savedBy, $userId);

		updatePost<Post["savedBy"]>("savedBy", updatedSaved, isNew, id);
	};

	const updateCoverage = (key: string) => {
		switch (key) {
			case "likes":
				updateLike();
				break;
			case "savedBy":
				updateSaved();
				break;
		}
	};

	return (
		<div
			key={id}
			className="rounded-md bg-base-300 p-4"
		>
			<PostHeader
				author={authorEmail}
				isNew={isNew}
				role={role}
				created_at={createdAt}
			/>
			<PostContent
				isNew={isNew}
				postId={id}
				content={content}
				updatePost={updatePost}
			/>
			{!isNew ? (
				<PostCoverage
					$userId={$userId}
					likes={likes}
					comments={comments}
					savedBy={savedBy}
					postId={id}
					show_likes={showLikes}
					updateCoverage={updateCoverage}
				/>
			) : (
				<NewPostControlButtons
					createNewPost={createNewPost}
					cancelNewPost={cancelNewPost}
					content={content}
				/>
			)}
		</div>
	);
};
