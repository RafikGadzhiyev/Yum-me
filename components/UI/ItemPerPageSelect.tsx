import { FC } from "react";
import clsx from "clsx";

interface IITemPerPageSelectProps {
	options: ItemSelectOption[];
	currentOption: ItemSelectOption;

	changeOptions: (newOption: ItemSelectOption) => void;
}

export const ItemPerPageSelect: FC<IITemPerPageSelectProps> = ({
	options,
	currentOption,
	changeOptions,
}) => {
	return (
		<div>
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