import { RiErrorWarningLine } from "react-icons/ri";

export const DataNotFound = () => {
	return (
		<div className="flex h-72 w-full flex-col items-center justify-center">
			<RiErrorWarningLine
				size={70}
				color="gray"
			/>
			<h1 className="text-xl font-bold text-gray-400">List is empty</h1>
		</div>
	);
};