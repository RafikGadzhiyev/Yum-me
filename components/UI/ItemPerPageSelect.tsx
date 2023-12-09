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
		setIsOpened(false)
	);

	const [isOpened, setIsOpened] = useState(false);

	return (
		<div
			ref={perPageSelectContainerRef}
			className={clsx("flex gap-1 mx-auto items-center relative", {
				"justify-center": horizontalAlign === "center",
				"justify-right": horizontalAlign === "right",
				"items-start": verticalAlign === "top",
				"items-end": verticalAlign === "bottom",
			})}
			onClick={() => setIsOpened((prevIsOpened) => !prevIsOpened)}
		>
			<div className="rounded-md cursor-pointer p-2 py-1 bg-[#87EFAC] text-center min-w-[100px] my-1">
				{currentOption.value} / per page
			</div>
			<AnimatePresence>
				{isOpened && (
					<motion.div
						className="absolute overflow-hidden bg-[#87EFAC] rounded-md top-full w-full flex flex-col"
						initial={{
							y: 20,
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: 20,
							opacity: 0,
						}}
					>
						{options.map((option, optionIndex) => (
							<button
								key={`per-page-${option.value}`}
								className={clsx("transition p-1", {
									"border-t": optionIndex !== 0,
									"hover:bg-green-400": option.value !== currentOption.value,
									"bg-green-500 text-white": option.value === currentOption.value,
								})}
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