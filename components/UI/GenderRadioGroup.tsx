import { FC } from "react";

import { useTranslation } from "react-i18next";

import { RadioGroup } from "@headlessui/react";

const GENDERS = ["male", "female"];

interface IGenderRadioGroupProps {
	initialGender: string;
	updateGender: (gender: string) => void;
}

export const GenderRadioGroup: FC<IGenderRadioGroupProps> = ({
	initialGender,
	updateGender,
}) => {
	const { t } = useTranslation();

	return (
		<RadioGroup
			value={initialGender}
			onChange={updateGender}
			className="flex flex-col items-start"
		>
			<RadioGroup.Label className="text-2xl font-bold">
				{t("GENDER")}
			</RadioGroup.Label>
			<div className="flex items-center gap-2">
				{GENDERS.map((gender) => (
					<RadioGroup.Option
						value={gender}
						key={gender}
						className="my-3 cursor-pointer rounded-md bg-slate-500 p-2 py-1 capitalize text-white ui-checked:bg-green-600"
					>
						{t(gender.toUpperCase())}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
};