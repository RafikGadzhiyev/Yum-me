import { useRef, useState } from "react";
import { useLoading } from "./useLoading";

// TODO: Implement
export const useFetch = <T>() => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	const { isLoading, startLoading, stopLoading } = useLoading();

	const [response, setResponse] = useState<useFetchResponse<T, RequestError>>({
		isLoading,
		result: null,
	});

	// TODO: realtime requests will not aborted
	// Collection of abort controllers that need for aborting repeatings request on the same endpoint (if it real time request, it will not)
	const abortControllers = useRef<Record<string, AbortController>>({});

	const sendRequest = (
		method: string,
		url: string,
		body: null | Record<string, any> = null,
		headers: null | Record<string, string> = null //? Something bad here
	) => {
		const requestAbortController = new AbortController();

		if (abortControllers.current[url]) {
			abortControllers.current[url].abort();

			// console.log("Previous request has aborted"); //? Maybe only for dev mode
		}

		abortControllers.current[url] = requestAbortController;

		startLoading();

		const request: RequestInit = {
			method,
			signal: requestAbortController.signal,
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
		stopRequest,
	};
};
