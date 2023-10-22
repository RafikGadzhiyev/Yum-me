// TODO: move type
interface IInputConfig {
	name: string;
	label: string;
	type: string;
	placeholder: string;
}

/**
 * @note name field is unique
 */
export const SIGN_UP_FORM_INPUTS: IInputConfig[] = [
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Email",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Password",
	},
];

/**
 * @note name field is unique
 */
export const SIGN_IN_FORM_INPUTS = [
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Email",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Password",
	},
];

export const AUTH_BY_TYPE = {
	sign_in: SIGN_IN_FORM_INPUTS,
	sign_up: SIGN_UP_FORM_INPUTS,
};
