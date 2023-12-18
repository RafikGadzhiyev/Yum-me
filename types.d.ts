interface IHomePageTabProps {
	list: any[]; //? Maybe we can improve using generics?
	state: ResponseStatus;

	updateList: (newValue: any) => void;
}

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

	withSearchParams?: boolean;
	isDynamic?: boolean;

	getDynamicPath?: (...args) => string;
	Icon?: () => JSX;
};

type ResponseStatus = "success" | "error" | "loading";

type RequestError = null | {
	title: string;
	message: string;
};

// Style types
type Alignment = {
	verticalAlign?: "top" | "middle" | "bottom";
	horizontalAlign?: "left" | "center" | "right";
};

// JS extendable types
type StringTransformTypes = "capitalize" | "uppercase" | "lowercase";

// Types with generic
type RequestResponse<T, U> = {
	data: T;
	error: U;
	status: ResponseNumericStatuses;
};

type useFetchResponse<T, U> = {
	isLoading: boolean;
	result: RequestResponse<T, U> | null;
};

// UI Types
type ItemSelectOption = {
	value: number;
};

// API Types
type AuthType = "sign_up" | "sign_in";
// TODO: Change
type ResponseNumericStatuses =
	| 200
	| 301
	| 302
	| 304
	| 400
	| 401
	| 403
	| 404
	| 500
	| 501
	| 502;