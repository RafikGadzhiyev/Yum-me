import { useCallback, useState } from "react";

export const useStreamResponse = () => {
	const [data, setData] = useState("");
	const [isReading, setIsReading] = useState(false);

	const readData = async (streamResponse: ReadableStream<Uint8Array> | null) => {
		if (!streamResponse) return;
		setData("");

		let done = false;

		const reader = streamResponse.getReader();
		const decoder = new TextDecoder();

		setIsReading(true);

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;

			const dataChunk = decoder.decode(value);
			setData((prevData) => prevData + dataChunk);
		}

		setIsReading(false);
	};

	const clearData = useCallback(() => {
		setData("");
	}, []);

	return {
		data,
		isReading,

		clearData,
		readData,
	};
};
