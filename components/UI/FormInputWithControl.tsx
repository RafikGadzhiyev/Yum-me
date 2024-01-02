import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
	DetailedHTMLProps,
	HTMLAttributes,
	HTMLInputTypeAttribute,
	PropsWithChildren,
} from "react";

interface IFormInputWithControlProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		PropsWithChildren {
	isInvalid: boolean;
	label: string;
	registerProps: UseFormRegisterReturn<string>;
	error: FieldError | undefined;
	type: HTMLInputTypeAttribute;
}

export function FormInputWithControlProps({
	registerProps,
	label,
	error,
	isInvalid,
	children,

	...attributes
}: IFormInputWithControlProps) {
	return (
		<FormControl isInvalid={isInvalid}>
			<FormLabel>{label}</FormLabel>
			<InputGroup>
				<Input
					{...attributes}
					{...registerProps}
					aria-label={label}
					className="w-full rounded-md p-1"
				/>
				{children}
			</InputGroup>
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
}