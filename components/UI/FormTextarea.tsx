import { useTranslation } from "react-i18next";

import { Textarea } from "@chakra-ui/react";

interface IFormInputProps {
	initialValue: string;
	labelValueKey: string;
	field: string;
	placeholder: string;
	updateValue: (key: string, value: string) => void;
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
			<label className="font-bold text-2xl">{t(labelValueKey)}</label>
			<Textarea
				variant="filled"
				bgColor="white"
				className="rounded-md p-2 py-1 w-full h-60 resize-none"
				placeholder={placeholder}
				size="sm"
				rounded={3}
				value={initialValue}
				onChange={(e) => updateValue(field, e.target.value)}
			/>
		</div>
	);
}
