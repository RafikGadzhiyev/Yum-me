import { toast, ToastPosition, TypeOptions } from "react-toastify";

interface IShowToastProps {
	title: string;
	description: string;
	type?: TypeOptions;
	duration?: number;
	isClosable?: boolean;
	position?: ToastPosition;
}

export const useShowToast = () => {
	const show = (props: IShowToastProps) => {
		toast(`${props.title}: ${props.description}`, {
			position: props.position,
			type: props.type,
			closeOnClick: true,
			autoClose: props.duration,
			pauseOnHover: true,
		});
	};

	return {
		show,
	};
};
