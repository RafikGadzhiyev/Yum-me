"use client";

import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

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
	label: string; // Either string or Key for i18n
	content: string;
}

export const ContentModal: FC<IContentWrapper> = ({ content, label }) => {
	const { t, i18n } = useTranslation();

	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<Button
				variant="ghost"
				colorScheme="green"
				// className="rounded-md p-2 bg-green-300 py-1 transition hover:bg-green-400"
				onClick={onOpen}
			>
				{/*TODO: RENAME*/}
				{t("SHOW_CONFIG")}
			</Button>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered
				size="3xl"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{i18n.exists(label) ? t(label) : label}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<pre className="whitespace-pre-wrap">{content}</pre>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>{t("CLOSE")}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};