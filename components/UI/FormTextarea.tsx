import { useTranslation } from "react-i18next";

import { HTMLInputTypeAttribute } from "react";

interface IFormInputProps {
	initialValue: string;
	labelValueKey: string;
	field: string;
	placeholder: string;
	updateValue: (key: string, value: string, type: HTMLInputTypeAttribute) => void;
}

export function FormTextarea({
	initialValue,
	labelValueKey,
	field,
	placeholder,
	updateValue,
}: IFormInputProps) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-start gap-2">
			<label className="text-2xl font-bold">{t(labelValueKey)}</label>
			<textarea
				className="textarea textarea-bordered h-60 w-full"
				placeholder={placeholder}
				value={initialValue}
				onChange={(e) => updateValue(field, e.target.value, "text")}
			/>
		</div>
	);
}
