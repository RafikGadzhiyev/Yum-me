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
	useDisclosure,
	Card,
	Collapse,
} from "@chakra-ui/react";
import { Loading } from "../UI/Loading";

import { isConfigured } from "@/utils/validation.util";

interface IGenerateNewFoodButtonProps {
	updateGeneratedFoodList: (generatedFood: GeneratedFood | GeneratedFood[]) => void;
}

export const GenerateNewFoodModal: FC<IGenerateNewFoodButtonProps> = ({
	updateGeneratedFoodList,
}) => {
	const healthData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);

	const AIResponseContainerRef = useRef<HTMLDivElement | null>(null);

	const { isLoading, sendRequest, sendStreamRequest } = useFetch();
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

	const addNewFood = () => {
		if (!healthData) {
			return;
		}

		const generatedDate = Date.now();
		const request: GeneratedFoodRequestBody = {
			email: healthData.email,
			generatedDate,
			food: data,
		};

		sendRequest("POST", "/api/storage/text_generation", request, {
			"Content-Type": "application/json",
		})
			.then((updatedGeneratedFoodList: GeneratedFood[]) => {
				updateGeneratedFoodList(updatedGeneratedFoodList);
			})
			.finally(onClose);
	};

	useEffect(() => {
		AIResponseContainerRef.current?.scrollIntoView({
			block: "end",
			behavior: "smooth",
		});
	}, [data]);

	return (
		<>
			<Button
				mb={5}
				variant="outline"
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
							in={!!data}
							animateOpacity
						>
							<div className="max-h-[400px] overflow-y-auto rounded-md">
								<Card
									ref={AIResponseContainerRef}
									backgroundColor="green.300"
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