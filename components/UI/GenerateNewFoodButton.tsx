"use client";

import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import { useFetch } from "@/hooks/useFetch";
import {
	Button,
	Text,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Card,
	Collapse,
} from "@chakra-ui/react";
import { Loading } from "./Loading";

interface IGenerateNewFoodButtonProps {
	email: string;
	updateGeneratedFoodList: (generatedFood: Record<string, any>) => void;
}

export const GenerateNewFoodButton: FC<IGenerateNewFoodButtonProps> = ({
	email,
	updateGeneratedFoodList,
}) => {
	const router = useRouter();

	const { isLoading, sendRequest, response } = useFetch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const generateNewAIResponse = () => {
		sendRequest("GET", `/api/AI/generate_text?email=${email}`);
	};

	const addNewFood = () => {
		const generatedDate = new Date();
		const request = {
			email,
			generatedDate,
			food: (response.result?.data as any)?.result || "",
		};
		sendRequest("POST", "/api/storage/text_generation", request, {
			"Content-Type": "application/json",
		})
			.then(() => {
				updateGeneratedFoodList(request);
			})
			.finally(onClose);
	};

	return (
		<>
			<Button
				onClick={onOpen}
				isLoading={isLoading}
			>
				Regenerate
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					{isLoading && <Loading />}

					<ModalHeader>Generation message prompt</ModalHeader>
					<ModalBody>
						<Collapse
							in={!isLoading && !!response.result}
							animateOpacity
						>
							<div className="max-h-[400px] overflow-y-auto rounded-md">
								<Card
									backgroundColor="green.300"
									p={3}
									my={2}
								>
									<ReactMarkdown>
										{(response.result?.data as any)?.result || ""}
									</ReactMarkdown>
								</Card>
							</div>
						</Collapse>
					</ModalBody>
					<ModalFooter gap={2}>
						<div className="flex items-center gap-3 justify-end">
							<Button
								onClick={addNewFood}
								variant="ghost"
								colorScheme="green"
							>
								Save
							</Button>
							<Button
								onClick={generateNewAIResponse}
								variant="ghost"
								colorScheme="red"
							>
								Regenerate
							</Button>
						</div>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
