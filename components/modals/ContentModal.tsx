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
	config: string;
}

export const ContentModal: FC<IContentWrapper> = ({ config }) => {
	const { t } = useTranslation();

	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<Button
				variant="ghost"
				colorScheme="green"
				// className="rounded-md p-2 bg-green-300 py-1 transition hover:bg-green-400"
				onClick={onOpen}
			>
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
					<ModalHeader>{t("USER_HEALTH_CONFIG")}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<pre className="whitespace-pre-wrap">{config}</pre>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>{t("CLOSE")}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
