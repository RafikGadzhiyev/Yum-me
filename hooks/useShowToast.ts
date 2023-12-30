import { UseToastOptions, useToast } from "@chakra-ui/react";

interface IShowToastProps {
	title: string;
	description: string;
	status: UseToastOptions["status"];
	duration?: number;
	isClosable?: boolean;
}

const DEFAULT_PARAMS = {
	duration: 2500,
	isClosable: true,
};

export const useShowToast = () => {
	const toast = useToast();

	const show = (props: IShowToastProps) => {
		const paramsWithDefaultValues = {
			...DEFAULT_PARAMS,
			...props,
		};

		toast(paramsWithDefaultValues);
	};

	return {
		show,
	};
};