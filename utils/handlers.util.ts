import "server-only";
import { NextResponse } from "next/server";

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
