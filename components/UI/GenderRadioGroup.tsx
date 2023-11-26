import { FC } from "react";

import { useTranslation } from "react-i18next";

import { RadioGroup } from "@headlessui/react";

const GENDERS = ["male", "female"];

interface IGenderRadioGroupProsp {
	initialGender: string;
	updateGender: (gender: string) => void;
}

export const GenderRadioGroup: FC<IGenderRadioGroupProsp> = ({
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
			<RadioGroup.Label className="font-bold text-2xl">
				{t("GENDER")}
			</RadioGroup.Label>
			<div className="flex items-center gap-2">
				{GENDERS.map((gender) => (
					<RadioGroup.Option
						value={gender}
						key={gender}
						className="bg-slate-500 capitalize text-white my-3 p-2 py-1 rounded-md ui-checked:bg-green-600 cursor-pointer"
					>
						{t(gender.toUpperCase())}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
};
