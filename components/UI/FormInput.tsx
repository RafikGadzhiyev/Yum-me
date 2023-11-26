import { useTranslation } from "react-i18next";

import { Input } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

interface IFormInputProps<
	T extends number | string,
	U extends HTMLInputTypeAttribute
> {
	initialValue: T;
	field: string;
	labelValueKey: string;
	placeholder: string;
	type: U;
	updateValue: (key: string, value: T) => void;
}

export function FormInput<
	T extends number | string,
	U extends HTMLInputTypeAttribute
>({
	initialValue,
	field,
	labelValueKey,
	placeholder,
	type,
	updateValue,
}: IFormInputProps<T, U>) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-start gap-2">
			<label className="font-bold text-2xl">{t(labelValueKey)}</label>
			<Input
				variant="filled"
				type={type}
				bgColor="white"
				width="fit-content"
				placeholder={placeholder}
				size="sm"
				rounded={3}
				value={initialValue}
				onChange={(e) => updateValue(field, e.target.value as T)}
			/>
		</div>
	);
}
