import { FC } from "react";

interface ISkeletonProps {
	width: string;
	height: string;
	rounded?: boolean;
}

export const Skeleton: FC<ISkeletonProps> = ({ width, height, rounded }) => {
	return (
		<div
			className={`bg-gray-200 dark:bg-gray-400 mb-4 ${
				rounded ? "rounded-md" : ""
			}`}
			style={{ width, height }}
		></div>
	);
};
