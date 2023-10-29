"use client";

import { FC, PropsWithChildren } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@chakra-ui/react";

interface IContentWrapper extends PropsWithChildren {
	config: string;
}

export const ContentModal: FC<IContentWrapper> = ({ config }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<button
				className="rounded-md p-2 bg-green-300 py-1 transition hover:bg-green-400"
				onClick={onOpen}
			>
				Show config
			</button>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered
				size={"3xl"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>User health config</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<pre className="whitespace-pre-wrap">{config}</pre>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
