"use client";

import { FC, useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { CiExport } from "react-icons/ci";

import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";

import { ListWithPagination } from "./ListWithPagination";
import { GenerateNewFoodModal } from "@/components/modals/GenerateNewFoodModal";
import { DataNotFound } from "@/components/UI/DataNotFound";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { Accordion } from "@/components/UI/Accordion";

export const GeneratedFoodsTab: FC<ITabProps> = ({ state }) => {
	const userData = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user,
	);

	const [generatedFoods, setGeneratedFoods] = useState<GeneratedFood[]>(
		userData?.generatedFoods,
	);

	const { i18n } = useTranslation();

	if (state === "loading") {
		return <span>Loading. . .</span>;
	}

	if (state === "error") {
		return <span>Something went wrong. Please, try again!</span>;
	}

	function generateLink(generatedFood: GeneratedFood) {
		const fileWithContent = new File(
			[generatedFood.description],
			`${generatedFood.createdAt}.txt`,
		);

		return URL.createObjectURL(fileWithContent);
	}

	return (
		<div>
			{/*{isEditable && (*/}
			<GenerateNewFoodModal
				updateGeneratedFoodList={(generatedFood) =>
					setGeneratedFoods((prevGeneratedFoods) => [
						...prevGeneratedFoods,
						generatedFood,
					])
				}
			/>
			{/*)}*/}

			{generatedFoods?.length ? (
				<ListWithPagination>
					{generatedFoods.map((generatedFood) => (
						<div
							key={generatedFood.id}
							className="flex items-center gap-2"
						>
							<Accordion
								label={format(
									new Date(generatedFood.createdAt),
									"dd MMMM yyyy HH:mm:ss",
									{
										locale: LOCALE_BY_LANGUAGE[i18n.language],
									},
								)}
							>
								<ReactMarkdown>{generatedFood.description}</ReactMarkdown>
							</Accordion>

							<a
								href={generateLink(generatedFood)}
								className="btn btn-link flex items-center"
								download
							>
								<CiExport size={25} />
							</a>
						</div>
					))}
				</ListWithPagination>
			) : (
				<DataNotFound />
			)}
		</div>
	);
};
