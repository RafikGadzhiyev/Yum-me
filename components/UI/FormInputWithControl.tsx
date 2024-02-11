import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
	DetailedHTMLProps,
	HTMLAttributes,
	HTMLInputTypeAttribute,
	PropsWithChildren,
} from "react";
import clsx from "clsx";

interface IFormInputWithControlProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		PropsWithChildren {
	isInvalid: boolean;
	label: string;
	registerProps: UseFormRegisterReturn<string>;
	error: FieldError | undefined;
	type: HTMLInputTypeAttribute;
	RightComponent?: () => JSX.Element;
}

export function FormInputWithControlProps({
	registerProps,
	label,
	error,
	isInvalid,
	RightComponent,

	...attributes
}: IFormInputWithControlProps) {
	return (
		<div className="w-full">
			<label>{label}</label>
			<div className="relative">
				<input
					{...attributes}
					{...registerProps}
					aria-label={label}
					className={clsx("input input-bordered w-full rounded-md p-1", {
						"border-error focus:border-error focus:outline-error": isInvalid,
					})}
				/>

				{RightComponent && (
					<div className="absolute right-1 top-1/2 -translate-y-1/2">
						<RightComponent />
					</div>
				)}
			</div>
			{error && <span className="text-sm text-error">{error.message}</span>}
		</div>
	);
}
