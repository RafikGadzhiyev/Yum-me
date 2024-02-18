import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useOutsideClick } from "@/hooks/useOutside";

interface IITemPerPageSelectProps extends Alignment {
	options: ItemSelectOption[];
	currentOption: ItemSelectOption;

	changeOptions: (newOption: ItemSelectOption) => void;
}

export const ItemPerPageSelect: FC<IITemPerPageSelectProps> = ({
	options,
	currentOption,
	horizontalAlign,
	verticalAlign,
	changeOptions,
}) => {
	const perPageSelectContainerRef = useOutsideClick<HTMLDivElement>(() =>
		setIsOpened(false),
	);

	const [isOpened, setIsOpened] = useState(false);

	return (
		<div
			ref={perPageSelectContainerRef}
			className={clsx("relative mx-auto ml-auto flex items-center gap-1", {
				"justify-center": horizontalAlign === "center",
				"justify-right": horizontalAlign === "right",
				"items-start": verticalAlign === "top",
				"items-end": verticalAlign === "bottom",
			})}
			onClick={() => setIsOpened((prevIsOpened) => !prevIsOpened)}
		>
			<div
				className="btn-solid btn my-1 min-w-[100px] cursor-pointer rounded-md p-2 py-1 text-center"
				role="button"
			>
				{currentOption.value} / per page
			</div>
			<AnimatePresence>
				{isOpened && (
					<motion.div
						className="absolute top-full z-50 flex w-full flex-col overflow-hidden rounded-md bg-info-content"
						initial={{
							y: -20,
							opacity: 0,
						}}
						animate={{
							y: "-145%",
							opacity: 1,
						}}
						exit={{
							y: -20,
							opacity: 0,
						}}
					>
						{options.map((option) => (
							<button
								key={`per-page-${option.value}`}
								className="btn-solid btn-ghost"
								onClick={() => changeOptions(option)}
							>
								{option.value}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
