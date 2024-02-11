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

type PostComment = {
	id: string;
	author: string; // user full name
	email: string;
	content: string;
	createdAt: Date;
	replies: PostComment[];
};

type GeneratedFood = {
	id: strin;
	createdAt: Date;
	generatedById: string;
	description: string;
};

type Post = {
	id: string;
	authorId: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
	showLikes: boolean;
	likes: string[];
	comments: PostComment[];
	savedBy: string[];
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
	status: number;
};

// TODO: REFACTOR
type RequestResponseWithSuccess<T, U> = Omit<RequestResponse<T, U>, "status"> & {
	success: boolean;
};

interface ITabProps {
	state: ResponseStatus;
	isEditable: boolean;
}

type TabContext = {
	tabs: Tab[];
	currentTabKey?: string;
	onChange: (tab: string) => void;
};

type Tab = {
	key: string;
	Component: FC<any>; // eslint-disable-line
	roles?: $Enums.Role[];
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
type GeneratedFoodRequestBody = {
	generatedById: string;
	description: string;
};

type AuthLiteError = {
	code: string;
	message: string;
};

type PostRequestBody = {
	created_at: Date;
	author: string;
	role: string;
	show_likes: boolean;
	coverage: string;
	content: string;
};
