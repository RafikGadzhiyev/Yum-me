"use client";

import { FC, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import { useFetch } from "@/hooks/useFetch";
import {
	Button,
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
	data: any;
}

export const GenerateNewFoodButton: FC<IGenerateNewFoodButtonProps> = ({
	email,
	updateGeneratedFoodList,
	data,
}) => {
	const [AIResponse, setAIResponse] = useState("");
	const AIResponseContainerRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	const { isLoading, sendRequest, sendStreamRequest, response } = useFetch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const generateNewAIResponse = async () => {
		setAIResponse("");

		const streamedData = await sendStreamRequest(
			"POST",
			`/api/AI/generate_text?email=${email}`,
			data,
			{
				"Content-Type": "application/json",
			}
		);

		if (!streamedData) {
			return;
		}

		const reader = streamedData.getReader();
		const decoder = new TextDecoder();

		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;

			const chunkValue = decoder.decode(value);
			setAIResponse((prevAIResponse) => prevAIResponse + chunkValue);
		}
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

	useEffect(() => {
		AIResponseContainerRef.current?.scrollIntoView({
			block: "end",
			behavior: "smooth",
		});
	}, [AIResponse]);

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
						{/* in={!isLoading && !!response.result} */}
						<Collapse
							in={!!AIResponse}
							animateOpacity
						>
							<div className="max-h-[400px] overflow-y-auto rounded-md">
								<Card
									ref={AIResponseContainerRef}
									backgroundColor="green.300"
									p={3}
									my={2}
								>
									<ReactMarkdown>
										{/* {(response.result?.data as any)?.result || ""} */}
										{AIResponse}
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
