import { FaRegComment } from "react-icons/fa";
import { FC, FormEvent, useRef, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import {
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { RootStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { ID } from "@/lib/appwrite";
import { getUserFullName } from "@/utils/post.utils";
import { updatePost } from "@/api/post";
import { formatDistanceToNow } from "date-fns";
import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";
import i18n from "i18next";

interface IPostCommentsModalProps {
	postId: string;
	coverage: Post["coverage"];
}

export const PostCommentsModal: FC<IPostCommentsModalProps> = ({
	postId,
	coverage,
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const userData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [comments, setComments] = useState(coverage.comments);

	const addNewPostComment = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputRef.current || !userData) return;

		const newPostComment: PostComment = {
			id: ID.unique(),
			content: inputRef.current.value,
			author: getUserFullName(userData as User),
			email: userData.email,
			created_at: new Date(),
			replies: [],
		};

		inputRef.current.value = "";

		await updatePost(postId, {
			coverage: JSON.stringify({
				...coverage,
				comments: [...coverage.comments, newPostComment],
			}),
		});

		setComments((prevComments) => [...prevComments, newPostComment]);
	};

	return (
		<>
			<button
				className="flex items-center gap-1"
				onClick={onOpen}
			>
				{/*TODO: RENAME*/}
				<FaRegComment />
				<span>{comments.length}</span>
			</button>

			<Modal
				isCentered
				size="3xl"
				onClose={onClose}
				isOpen={isOpen}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Comments</ModalHeader>
					<ModalCloseButton />
					<ModalBody className="mt-5 max-h-[75vh] overflow-y-auto">
						{comments.length ? (
							<div>
								{comments.map((comment) => (
									<div
										key={comment.id}
										className="my-5 rounded-md bg-slate-200 px-3 py-1"
									>
										<div className="items center flex justify-between">
											<h1 className="text-xl font-bold">{comment.author}</h1>
											<span>
												{formatDistanceToNow(new Date(comment.created_at), {
													addSuffix: true,
													locale: LOCALE_BY_LANGUAGE[i18n.language],
												})}
											</span>
										</div>
										<span className="text-gray-400">{comment.content}</span>
									</div>
								))}
							</div>
						) : (
							<div className="flex h-72 w-full flex-col items-center justify-center">
								<RiErrorWarningLine
									size={70}
									color="gray"
								/>
								<h1 className="text-xl font-bold text-gray-400">No comments</h1>
							</div>
						)}
					</ModalBody>
					<ModalFooter>
						<form
							className="relative flex w-full items-center"
							onSubmit={addNewPostComment}
						>
							<Input
								backgroundColor="gray.100"
								ref={inputRef}
							/>
							<button className="absolute right-3 z-30 cursor-pointer text-gray-400 hover:text-black">
								Send
							</button>
						</form>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};