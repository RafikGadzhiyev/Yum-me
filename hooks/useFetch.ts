import { useCallback, useRef, useState } from "react";
import { useLoading } from "./useLoading";

// TODO: restructure fetch object like fetch.patch
export const useFetch = <T>() => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	const { isLoading, startLoading, stopLoading } = useLoading();

	const [response, setResponse] = useState<useFetchResponse<T, RequestError>>({
		isLoading,
		result: null,
	});
	const [responseStatus, setResponseStatus] = useState<ResponseStatus>("success");

	const abortControllers = useRef<Record<string, AbortController>>({});

	const abortPreviousRequestAndSaveNew = (url: string) => {
		const requestAbortController = new AbortController();

		if (abortControllers.current[url]) {
			abortControllers.current[url].abort();
		}

		abortControllers.current[url] = requestAbortController;

		return abortControllers.current[url];
	};

	const sendRequest = useCallback(
		function <T>(
			method: string,
			url: string,
			body: null | Record<string, T> = null,
			headers: null | Record<string, string> = null,
			options: Record<string, unknown> = {},
		) {
			const { withoutLoading, cancelable } = options;

			if (!withoutLoading) {
				startLoading();
			}

			setResponseStatus("loading");

			const request: RequestInit = {
				method,
			};

			if (cancelable) {
				const requestController = abortPreviousRequestAndSaveNew(url);

				request.signal = requestController.signal;
			}

			if (headers) {
				request.headers = headers;

				if (headers["Content-Type"] === "application/json" && body) {
					request.body = JSON.stringify(body);
				}
			}

			return fetch(BASE_URL + url, request)
				.then((response) => {
					return response.json().then((data) => {
						setResponse((prev) => ({
							...prev,
							result: data,
						}));

						setResponseStatus("success");

						return data.data;
					});
				})
				.catch((error) => {
					setResponse((prev) => ({
						...prev,
						result: error,
					}));

					setResponseStatus("error");

					console.log(error);
				})
				.finally(stopLoading);
		},
		[BASE_URL, startLoading, stopLoading],
	);

	const sendStreamRequest = async function <T>(
		method: string,
		url: string,
		body: null | Record<string, T> = null,
		headers: null | Record<string, string> = null,
	): Promise<ReadableStream<Uint8Array> | null> {
		const requestController = abortPreviousRequestAndSaveNew(url);

		startLoading();
		setResponseStatus("loading");

		const request: RequestInit = {
			method,
			signal: requestController.signal,
		};

		if (headers) {
			request.headers = headers;

			if (headers["Content-Type"] === "application/json" && body) {
				request.body = JSON.stringify(body);
			}
		}

		const response = await fetch(BASE_URL + url, request);

		setResponseStatus("success");

		if (!response.ok) {
			setResponseStatus("error");

			return null;
		}

		stopLoading();

		return response.body;
	};

	const stopRequest = (url: string) => {
		if (abortControllers.current[url]) {
			abortControllers.current[url].abort();
			delete abortControllers.current[url];

			setResponse((prev) => ({
				...prev,
				result: null,
			}));

			return true;
		}

		return false;
	};

	return {
		isLoading,
		response,
		sendRequest,
		responseStatus,

		sendStreamRequest,
		stopRequest,
	};
};
