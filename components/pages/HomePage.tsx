"use client";
import { useTranslation } from "react-i18next";
import { Accordion } from "../UI/Accordion";
import { requestToAI } from "@/mocks/AIResponse.mock";
import ReactMarkdown from "react-markdown";
import { Accordion as AccordionContainer } from "@chakra-ui/react";

export const HomePage = () => {
	const { t } = useTranslation();

	const WEEK_DAYS = Object.entries(t("DAY_OF_WEEK", { returnObjects: true }));

	return (
		<div className=" flex flex-col gap-2">
			<AccordionContainer
				allowToggle
				display={"grid"}
				gap={3}
			>
				{WEEK_DAYS.map(([key, day]) => (
					<Accordion
						key={key}
						label={day.LONG}
					>
						<ReactMarkdown>{requestToAI.response}</ReactMarkdown>
					</Accordion>
				))}
			</AccordionContainer>
		</div>
	);
};
