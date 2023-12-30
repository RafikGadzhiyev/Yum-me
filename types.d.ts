// Supabase types
type User = {
	id: string;
	created_at: number;
	updated_at: number;
	name: string;
	last_name: string;
	email: string;
	age: number;
	weight: number;
	height: number;
	contraindications: text;
	wishes: string;
	gender: string;
	calories_per_day: number;
	generated_foods: GeneratedFood[];
	role: string;
};

type GeneratedFood = {
	$id: string;
	created_at: Date;
	description: string;
};

type Post = {
	_id: string;
	author: string;
	role: string;
	created_at: number;
	showLikes: boolean;
	coverage: {
		likes: number;
		comments: Comment[];
		saved: number;
	};
	content: string;
};

type Comment = {
	author: string;
	created_at: number;
	likes: number;
	content: string;
};

//? Should I save this?
// type IInputConfig = {
// 	name: string;
// 	label: string;
// 	type: string;
// 	placeholder: string;
// };

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

// TODO: REFACTOR
type RequestResponseWithSuccess<T, U> = Omit<RequestResponse<T, U>, "status"> & {
	success: boolean;
};

interface ITabProps<T> {
	list: T[];
	state: ResponseStatus;
	isEditable: boolean;

	updateList: (newValue: T | T[]) => void;
}

type useFetchResponse<T, U> = {
	isLoading: boolean;
	result: RequestResponse<T, U> | null;
};

// UI Types
type ItemSelectOption = {
	value: number;
};

// API Types
type GeneratedFoodRequestBody = {
	generated_for: string;
	created_at: Date;
	description: string;
};

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