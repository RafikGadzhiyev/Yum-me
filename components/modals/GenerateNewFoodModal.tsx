import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";

import { useFetch } from "@/hooks/useFetch";
import { useStreamResponse } from "@/hooks/useStreamResponse";

import { Loading } from "../UI/Loading";

import { isConfigured } from "@/utils/validation.util";

interface IGenerateNewFoodButtonProps {
	updateGeneratedFoodList: (generatedFood: GeneratedFood) => void;
}

export const GenerateNewFoodModal: FC<IGenerateNewFoodButtonProps> = ({
	updateGeneratedFoodList,
}) => {
	const { i18n, t } = useTranslation();

	const modalStateRef = useRef<HTMLInputElement | null>(null);
	const healthData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.healthData,
	);

	const AIResponseContainerRef = useRef<HTMLDivElement | null>(null);

	const { isLoading, sendStreamRequest, sendRequest } = useFetch();
	const { data, isReading, readData } = useStreamResponse();

	const generateNewAIResponse = async () => {
		if (!healthData) {
			return;
		}

		const streamedData = await sendStreamRequest(
			"POST",
			`/api/AI/generate_text?email=${healthData.email}`,
			{ lang: i18n.language, data: healthData },
			{
				"Content-Type": "application/json",
			},
		);

		await readData(streamedData);
	};

	const addNewFood = async () => {
		if (!healthData) {
			return;
		}

		const request: GeneratedFoodRequestBody = {
			generatedById: healthData.id,
			description: data,
		};

		const generatedFood = await sendRequest("POST", "/api/generated_food", request, {
			"Content-Type": "application/json",
		});

		updateGeneratedFoodList(generatedFood);

		if (!modalStateRef.current) {
			return;
		}

		modalStateRef.current.checked = false;
	};

	useEffect(() => {
		AIResponseContainerRef.current?.scrollIntoView({
			block: "end",
			behavior: "smooth",
		});
	}, [data]);

	return (
		<>
			<label
				className="btn btn-outline mb-5"
				htmlFor="generate_modal"
			>
				{t("GENERATE")}
			</label>

			<input
				ref={modalStateRef}
				type="checkbox"
				id="generate_modal"
				className="modal-toggle"
			/>

			<div
				className="modal"
				role="dialog"
			>
				<div className="modal-box">
					{isLoading && <Loading />}
					<h3 className="text-lg font-bold">
						{t("GENERATION_BY_USER_HEALTH_DATA")}
					</h3>
					<pre className="mt-3 whitespace-pre-wrap">
						{JSON.stringify(healthData, null, 2)}
					</pre>
					{/*TODO: Add collapsing*/}
					{/*FIXME:  issue with scrolling*/}
					<div
						ref={AIResponseContainerRef}
						className="my-3 max-h-[400px] overflow-y-auto rounded-md bg-accent px-3 text-accent-content"
					>
						<ReactMarkdown>{data}</ReactMarkdown>
					</div>

					<div className="flex items-center justify-end gap-3 ">
						<button
							className="btn btn-success"
							onClick={addNewFood}
							disabled={!data || isReading}
						>
							{t("SAVE")}
						</button>

						<button
							onClick={generateNewAIResponse}
							className="btn btn-error"
							disabled={!isConfigured(healthData) || isReading}
						>
							{t("GENERATE")}
						</button>
					</div>
				</div>

				<label
					className="modal-backdrop"
					htmlFor="generate_modal"
				/>
			</div>
		</>
	);
};
