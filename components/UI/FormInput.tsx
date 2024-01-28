import { useTranslation } from "react-i18next";

import { Input } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

interface IFormInputProps {
	initialValue: string;
	field: string;
	labelValueKey: string;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
	updateValue: (key: string, value: string, type: HTMLInputTypeAttribute) => void;
}

export function FormInput({
	initialValue,
	field,
	labelValueKey,
	placeholder,
	type = "text",
	updateValue,
}: IFormInputProps) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-start gap-2">
			<label className="text-2xl font-bold">{t(labelValueKey)}</label>
			<Input
				variant="filled"
				type={type}
				bgColor="white"
				width="fit-content"
				placeholder={placeholder}
				size="sm"
				rounded={3}
				value={initialValue}
				onChange={(e) => updateValue(field, e.target.value, type)}
			/>
		</div>
	);
}
