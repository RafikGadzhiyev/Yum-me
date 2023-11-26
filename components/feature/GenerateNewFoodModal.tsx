"use client";

import { FC, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

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
import { Loading } from "../UI/Loading";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { isConfigured } from "@/utils/validation.util";

interface IGenerateNewFoodButtonProps {
	email: string;
	updateGeneratedFoodList: (generatedFood: Record<string, any>) => void;
}

export const GenerateNewFoodModal: FC<IGenerateNewFoodButtonProps> = ({
	email,
	updateGeneratedFoodList,
}) => {
	const healthData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData
	);

	const [AIResponse, setAIResponse] = useState("");
	const [isStreamed, setIsStreamed] = useState(false);

	const AIResponseContainerRef = useRef<HTMLDivElement | null>(null);

	const { isLoading, sendRequest, sendStreamRequest } = useFetch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const generateNewAIResponse = async () => {
		setAIResponse("");

		const streamedData = await sendStreamRequest(
			"POST",
			`/api/AI/generate_text?email=${email}`,
			healthData,
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

		setIsStreamed(true);

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;

			const chunkValue = decoder.decode(value);
			setAIResponse((prevAIResponse) => prevAIResponse + chunkValue);
		}

		setIsStreamed(false)
	};

	const addNewFood = () => {
		const generatedDate = new Date();
		const request = {
			email,
			generatedDate,
			food: AIResponse,
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
				Generate
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					{isLoading && <Loading />}

					<ModalHeader>Generation by user health data</ModalHeader>
					<ModalBody>
						<pre className="whitespace-pre-wrap">
							{JSON.stringify(healthData, null, 2)}
						</pre>
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
									<ReactMarkdown>{AIResponse}</ReactMarkdown>
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
								isDisabled={!AIResponse || isStreamed}
							>
								Save
							</Button>
							<Button
								onClick={generateNewAIResponse}
								variant="ghost"
								colorScheme="red"
								isDisabled={!isConfigured(healthData) || isStreamed}
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
