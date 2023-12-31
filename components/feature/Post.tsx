import { FC } from "react";
import { PostCoverage } from "@/components/UI/PostCoverage";
import { NewPostControlButtons } from "@/components/UI/NewPostControlButtons";
import { PostContent } from "@/components/UI/PostContent";
import { PostHeader } from "@/components/UI/PostHeader";

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

	const updateCoverage = (key: string) => {
		switch (key) {
			case "likes":
				updateLike();
				break;
		}
	};

	return (
		<div
			key={$id}
			className="rounded-md bg-white p-4"
		>
			<PostHeader
				author={author}
				isNew={isNew}
				role={role}
				created_at={created_at}
			/>
			<PostContent
				isNew={isNew}
				postId={$id}
				content={content}
				updatePost={updatePost}
			/>
			{!isNew ? (
				<PostCoverage
					{...coverage}
					postId={$id}
					show_likes={show_likes}
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