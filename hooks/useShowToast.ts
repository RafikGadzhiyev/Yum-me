import { UseToastOptions, useToast } from "@chakra-ui/react";

interface IShowToastProps {
	title: string;
	description: string;
	status: UseToastOptions["status"];
	duration?: number;
	isClosable?: boolean;
}

const DEFAULT_PARAMS = {
	DURATION: 2500,
	IS_CLOSABLE: true,
};

export const useShowToast = () => {
	const toast = useToast();

	const show = (props: IShowToastProps) => {
		toast(props);
	};

	return {
		show,
	};
};
