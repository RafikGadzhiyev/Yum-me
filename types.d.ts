type IInputConfig = {
	name: string;
	label: string;
	type: string;
	placeholder: string;
};

type Route = {
	path: string;
	key: string;
	label: string;
	Icon: () => JSX;
};

type AuthType = "sign_up" | "sign_in";
type StringTransformTypes = "capitalize" | "uppercase" | "lowercase";
