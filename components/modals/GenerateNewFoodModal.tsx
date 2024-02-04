import { FC, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";

import { useFetch } from "@/hooks/useFetch";
import { useStreamResponse } from "@/hooks/useStreamResponse";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Card,
	Collapse,
	useDisclosure,
} from "@chakra-ui/react";
import { Loading } from "../UI/Loading";

import { isConfigured } from "@/utils/validation.util";

interface IGenerateNewFoodButtonProps {
	updateGeneratedFoodList: (generatedFood: GeneratedFood) => void;
}

export const GenerateNewFoodModal: FC<IGenerateNewFoodButtonProps> = ({
	updateGeneratedFoodList,
}) => {
	// const healthData = useUserHealthData(user?.email || "");
	const healthData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.healthData,
	);

	const AIResponseContainerRef = useRef<HTMLDivElement | null>(null);

	const { isLoading, sendStreamRequest, sendRequest } = useFetch();
	const { data, isReading, readData } = useStreamResponse();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const generateNewAIResponse = async () => {
		if (!healthData) {
			return;
		}

		const streamedData = await sendStreamRequest(
			"POST",
			`/api/AI/generate_text?email=${healthData.email}`,
			healthData,
			{
				"Content-Type": "application/json",
			},
		);

		await readData(streamedData);
	};

	const addNewFood = async () => {
		if (!healthData) {
			return;
		}

		const request: GeneratedFoodRequestBody = {
			generatedById: healthData.id,
			description: data,
		};

		const generatedFood = await sendRequest("POST", "/api/generated_food", request, {
			"Content-Type": "application/json",
		});

		updateGeneratedFoodList(generatedFood);
		onClose();
	};

	useEffect(() => {
		AIResponseContainerRef.current?.scrollIntoView({
			block: "end",
			behavior: "smooth",
		});
	}, [data]);

	return (
		<>
			<button
				className="btn btn-outline mb-5	"
				onClick={onOpen}
			>
				Generate
			</button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent className="mt-5">
					{isLoading && <Loading />}

					<ModalHeader>Generation by user health data</ModalHeader>
					<ModalBody>
						<pre className="whitespace-pre-wrap">
							{JSON.stringify(healthData, null, 2)}
						</pre>
						<Collapse
							in={!!data}
							animateOpacity
						>
							<div className="max-h-[400px] overflow-y-auto rounded-md">
								<Card
									ref={AIResponseContainerRef}
									className="bg-accent text-accent-content"
									p={3}
									my={2}
								>
									<ReactMarkdown>{data}</ReactMarkdown>
								</Card>
							</div>
						</Collapse>
					</ModalBody>
					<ModalFooter gap={2}>
						<div className="flex items-center justify-end gap-3">
							<Button
								onClick={addNewFood}
								variant="ghost"
								colorScheme="green"
								isDisabled={!data || isReading}
							>
								Save
							</Button>
							<Button
								onClick={generateNewAIResponse}
								variant="ghost"
								colorScheme="red"
								isDisabled={!isConfigured(healthData) || isReading}
							>
								Generate
							</Button>
						</div>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
