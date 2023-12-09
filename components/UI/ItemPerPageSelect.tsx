import { FC } from "react";
import clsx from "clsx";

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
	return (
		<div
			className={clsx("flex gap-1 items-center", {
				"justify-center": horizontalAlign === "center",
				"justify-right": horizontalAlign === "right",
				"items-start": verticalAlign === "top",
				"items-end": verticalAlign === "bottom",
			})}
		>
			{options.map((option) => (
				<button
					key={`per-page-${option.value}`}
					className={clsx("rounded-md mx-2 p-1 border border-green-400", {
						"bg-green-300": currentOption.value === option.value,
					})}
					onClick={() => changeOptions(option)}
				>
					{option.value}
				</button>
			))}
		</div>
	);
};