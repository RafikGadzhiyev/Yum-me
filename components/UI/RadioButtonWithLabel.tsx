"use client";

import { useTranslation } from "react-i18next";
import { FC } from "react";

interface IRadioButtonWithLabelProps {
	checked: boolean;
	update: () => void;
	contentKey: string;
}

export const RadioButtonWithLabel: FC<IRadioButtonWithLabelProps> = ({
	checked,
	contentKey,
	update,
}) => {
	const { t } = useTranslation();
	return (
		<label className="label cursor-pointer justify-start gap-4">
			<input
				type="radio"
				name="radio"
				className="radio checked:bg-success"
				checked={checked}
				onChange={update}
			/>
			<span className="label-text">{t(contentKey)}</span>
		</label>
	);
};
