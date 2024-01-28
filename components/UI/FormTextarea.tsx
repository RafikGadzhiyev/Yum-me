import { useTranslation } from "react-i18next";

import { Textarea } from "@chakra-ui/react";
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
			<Textarea
				variant="filled"
				bgColor="white"
				className="h-60 w-full resize-none rounded-md p-2 py-1"
				placeholder={placeholder}
				size="sm"
				rounded={3}
				value={initialValue}
				onChange={(e) => updateValue(field, e.target.value, "text")}
			/>
		</div>
	);
}
