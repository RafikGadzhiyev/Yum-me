"use client";

import { FC } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";

import { Accordion as AccordionContainer } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";
import { ListWithPagination } from "./ListWithPagination";
import { GenerateNewFoodModal } from "@/components/feature/GenerateNewFoodModal";

export const GeneratedFoodsTab: FC<ITabProps<GeneratedFood>> = ({
	list,
	state,
	isEditable,

	updateList,
}) => {
	const { i18n } = useTranslation();

	if (state === "loading") {
		return <span>Loading. . .</span>;
	} else if (state === "error") {
		return <span>Something went wrong. Please, try again!</span>;
	}

	return (
		<div>
			{isEditable && <GenerateNewFoodModal updateGeneratedFoodList={updateList} />}

			{list.length ? (
				<AccordionContainer
					allowToggle
					display={"grid"}
					gap={3}
				>
					<ListWithPagination>
						{list.map((foodData) => (
							<Accordion
								key={foodData._id}
								label={format(
									new Date(foodData.generatedDate),
									"dd MMMM yyyy HH:mm:ss",
									{
										locale: LOCALE_BY_LANGUAGE[i18n.language],
									},
								)}
							>
								<ReactMarkdown>{foodData.food}</ReactMarkdown>
							</Accordion>
						))}
					</ListWithPagination>
				</AccordionContainer>
			) : (
				<span>Data not found</span>
			)}
		</div>
	);
};