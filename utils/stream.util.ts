import {
	createParser,
	ParsedEvent,
	ReconnectInterval,
} from "eventsource-parser";
import { openAI } from "./instances.util";

export const OpenAIStream = async (payload: any) => {
	let encoder = new TextEncoder();
	let decoder = new TextDecoder();

	let counter = 0;

	const res = await openAI.chat.completions.create(payload);

	const stream = new ReadableStream({
		async start(controller) {
			function onParse(event: ParsedEvent | ReconnectInterval) {
				if (event.type === "event") {
					const data = event.data;

					if (data === "[DONE]") {
						controller.close();
						return;
					}

					try {
						const json = JSON.parse(data);
						const text = json.choices[0].data;

						if (counter < 2 && (text.match(/\n/) || []).length) {
							return;
						}

						const queue = encoder.encode(text);
						controller.enqueue(queue);
						counter++;
					} catch (e) {
						console.error(e);
					}
				}
			}

			const parse = createParser(onParse);

			for await (let chunk of res.choices as any) {
				parse.feed(decoder.decode(chunk));
			}
		},
	});

	return stream;
};
