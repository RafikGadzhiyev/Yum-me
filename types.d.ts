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
	Icon?: () => JSX;
};

type RequestError = {
	title: string;
	message: string;
};

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

type AuthType = "sign_up" | "sign_in";
type StringTransformTypes = "capitalize" | "uppercase" | "lowercase";
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
