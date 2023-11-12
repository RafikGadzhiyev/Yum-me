"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import {
	Button,
	Input,
	Text,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	WrapItem,
	Card,
	Collapse,
} from "@chakra-ui/react";
import { Loading } from "./Loading";

export const GenerateNewFoodButton = () => {
	const [AIMessage, setAIMessage] = useState("");
	const { isLoading, sendRequest, response } = useFetch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const generateNewAIResponse = () => {
		if (!AIMessage.length) return;

		sendRequest("GET", `/api/AI/generate_text?message=${AIMessage}`);
	};

	useEffect(() => {
		if (isLoading) {
			console.log(response.result);
		}
	}, [isLoading, response]);

	return (
		<>
			<Button onClick={onOpen}>Generate food</Button>
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
						<Input
							placeholder="Write you message"
							required
							value={AIMessage}
							onChange={(e) => setAIMessage(e.target.value)}
						/>

						<Text
							size="xs"
							className="text-red-400"
						>
							Generation may take a while ~ 1-2 minutes
						</Text>

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
									<Text>{(response.result?.data as any)?.result || ""}</Text>
								</Card>

								<div className="flex items-center gap-3 justify-end">
									<Button
										onClick={onClose}
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
							</div>
						</Collapse>
					</ModalBody>
					<ModalFooter gap={2}>
						<Button
							onClick={onClose}
							variant="ghost"
							colorScheme="red"
						>
							Close
						</Button>
						<Button
							onClick={generateNewAIResponse}
							variant="ghost"
							colorScheme="green"
						>
							Generate
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
