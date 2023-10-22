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
