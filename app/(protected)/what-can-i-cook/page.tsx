"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useFetch } from "@/hooks/useFetch";
import { useStreamResponse } from "@/hooks/useStreamResponse";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

type Message = {
	_id: string;
	from: "system" | "user";
	text: string;
	// image?: string
};

export default function WhatCanICookPage() {
	const { sendStreamRequest } = useFetch();
	const { readData, clearData, isReading, data } = useStreamResponse();
	const { i18n } = useTranslation();

	const [messages, setMessages] = useState<Message[]>([]);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const lastMessageRef = useRef<HTMLDivElement | null>(null);

	const onSend = async (e: MouseEvent) => {
		e.preventDefault();

		if (!inputRef.current) {
			return;
		}

		const message: Message = {
			_id: ((Date.now() << 4) >> 6).toString(32),
			from: "user",
			text: inputRef.current.value,
		};

		setMessages((prevMessages) => [...prevMessages, message]);

		const streamedData = await sendStreamRequest(
			"POST",
			`/api/AI/generate_food`,
			{ ingredients: inputRef.current.value, lang: i18n.language },
			{
				"Content-Type": "application/json",
			},
		);

		inputRef.current.value = "";

		await readData(streamedData);
	};

	useEffect(() => {
		if (!isReading && data) {
			const AIResponse: Message = {
				_id: ((Date.now() << 4) >> 6).toString(32),
				from: "system",
				text: data,
			};

			clearData();
			setMessages((prevMessages) => [...prevMessages, AIResponse]);
		}

		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [clearData, isReading, data]);

	return (
		<div className="flex h-full flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold">What can I cook</h1>
				<h3 className="mb-3">
					Write down your ingredients and AI will suggest you foods that you can cook
				</h3>

				<label
					htmlFor="my_modal_6"
					className="btn"
				>
					Example
				</label>

				<input
					type="checkbox"
					id="my_modal_6"
					className="modal-toggle"
				/>
				<div
					className="modal"
					role="dialog"
				>
					<div className="modal-box">
						<div>
							<div className="chat chat-end">
								<div className="chat-bubble max-w-[300px] bg-primary">
									У меня 3 огурца, 1 помидор и капуста. Что можно приготовить из
									этого?
								</div>
							</div>

							<div className="chat chat-start">
								<div className="chat-bubble max-w-[300px] bg-secondary">
									Из этих ингредиентов можно приготовить много блюд! Вот несколько
									идей: Салат: Нарежьте огурцы, помидор и капусту на кусочки,
									добавьте зелень и посолите по вкусу. Полейте оливковым маслом или
									йогуртовым соусом. Свежие роллы: Сделайте суши-рис, оберните его в
									лист капусты, добавьте полоски огурца и помидора. Заверните в рулет
									и нарежьте на кусочки. Овощное рагу: Поджарьте капусту, помидоры и
									огурцы в сковороде с луком и чесноком. Посолите, поперчите и
									приправьте по вкусу. Можно добавить специи и зелень. Овощной суп:
									Приготовьте овощной бульон, добавьте нарезанные огурцы, помидоры и
									капусту. Поварите до готовности, посолите и поперчите по вкусу.
									Жареные овощи: Пожарьте на сковороде капусту, помидоры и огурцы с
									различными специями и соусами. Вот некоторые идеи! Выберите то, что
									вам больше нравится, и приготовьте вкусный ужин.
								</div>
							</div>
						</div>

						<div className="modal-action">
							<label
								htmlFor="my_modal_6"
								className="btn"
							>
								Close!
							</label>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-1 flex-col border border-primary">
				<div className="max-h-[650px] flex-1 overflow-y-auto">
					{messages.map((message) => (
						<div
							className={clsx("chat", {
								"chat-start": message.from === "system",
								"chat-end": message.from === "user",
							})}
							key={message._id}
						>
							<div
								className={clsx("chat-bubble max-w-[600px]", {
									"bg-primary": message.from === "user",
									"bg-secondary": message.from === "system",
								})}
							>
								<ReactMarkdown>{message.text}</ReactMarkdown>
							</div>
						</div>
					))}
					{data && (
						<div className="chat chat-start">
							<div
								ref={lastMessageRef}
								className="chat-bubble max-w-[600px] bg-secondary"
							>
								<ReactMarkdown>{data}</ReactMarkdown>
							</div>
						</div>
					)}
				</div>
				<form className="w-fill flex items-center gap-3 p-2">
					<input
						className="input input-bordered flex-1"
						ref={inputRef}
					/>
					<button
						className="btn btn-primary"
						onClick={(e: unknown) => onSend(e as MouseEvent)}
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
