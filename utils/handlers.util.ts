import { NextResponse } from "next/server";

export const handlerError = (
	reason: string,
	message: string,
	status: number
) => ({
	success: false,
	data: null,
	reason,
	message,
	status,
});

export const hanldeData = <T>(data: T) => ({
	success: true,
	reason: null,
	message: null,
	status: 200,
	data,
});

/**
 *
 *
 * V2
 *
 *
 */

export const handleRequest = <T = null, U = RequestError>(
	data: T,
	error: U,
	status: ResponseNumericStatuses = 403
): NextResponse<RequestResponse<T, U>> => {
	return NextResponse.json(
		{
			data,
			error,
			status,
		},
		{
			status,
		}
	);
};
