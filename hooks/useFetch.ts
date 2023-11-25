import { useCallback, useRef, useState } from "react";
import { useLoading } from "./useLoading";

export const useFetch = <T>() => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	const { isLoading, startLoading, stopLoading } = useLoading();

	const [response, setResponse] = useState<useFetchResponse<T, RequestError>>({
		isLoading,
		result: null,
	});

	// TODO: realtime requests will not aborted
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
		(
			method: string,
			url: string,
			body: null | Record<string, any> = null,
			headers: null | Record<string, string> = null //? Something bad here
		) => {
			const requestController = abortPreviousRequestAndSaveNew(url);

			startLoading();

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

			return fetch(BASE_URL + url, request)
				.then((response) => {
					return response.json().then((data) => {
						setResponse((prev) => ({
							...prev,
							result: data,
						}));
					});
				})
				.catch((error) => {
					setResponse((prev) => ({
						...prev,
						result: error,
					}));

					console.log(error);
				})
				.finally(stopLoading);
		},
		[BASE_URL, startLoading, stopLoading]
	);

	const sendStreamRequest = async (
		method: string,
		url: string,
		body: null | Record<string, any> = null,
		headers: null | Record<string, string> = null //? Something bad here
	): Promise<ReadableStream<Uint8Array> | null> => {
		const requestController = abortPreviousRequestAndSaveNew(url);

		startLoading();

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
		sendStreamRequest,
		stopRequest,
	};
};
