"use client";

import { FC } from "react";
import { format } from "date-fns";

import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";
import { Accordion as AccordionContainer } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";

import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";
import { ListWithPagination } from "./ListWithPagination";

interface IGeneratedFoodsTab {
	generatedFoods: any[];
}

export const GeneratedFoodsTab: FC<IGeneratedFoodsTab> = ({ generatedFoods }) => {
	const { i18n } = useTranslation();

	return (
		<div>
			<AccordionContainer
				allowToggle
				display={"grid"}
				gap={3}
			>
				<ListWithPagination>
					{generatedFoods.map((foodData) => (
						<Accordion
							key={foodData._id}
							label={format(
								new Date(foodData.generatedDate),
								"dd MMMM yyyy HH:mm:ss",
								{
									locale: LOCALE_BY_LANGUAGE[i18n.language]
								}
							)}
						>
							<ReactMarkdown>{foodData.food}</ReactMarkdown>
						</Accordion>
					))}
				</ListWithPagination>
			</AccordionContainer>
		</div>
	);
};
