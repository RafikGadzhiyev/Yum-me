import { FC } from "react";
import clsx from "clsx";

// TODO: in progress, not finished
interface ISkeletonProps {
	width: string;
	height: string;
	rounded?: boolean;
}

export const Skeleton: FC<ISkeletonProps> = ({ width, height, rounded }) => {
	return (
		<div
			className={clsx("bg-gray-200 dark:bg-gray-400 mb-4", {
				"rounded-md": rounded,
			})}
			style={{ width, height }}
		></div>
	);
};
