"use client";

import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";

import { Accordion as AccordionContainer } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";
import { ListWithPagination } from "./ListWithPagination";
import { GenerateNewFoodModal } from "@/components/modals/GenerateNewFoodModal";
import { DataNotFound } from "@/components/UI/DataNotFound";
import { getGeneratedFoodList } from "@/api/generatedFood";
import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { Query, UserActiveSession } from "@/lib/appwrite";

export const GeneratedFoodsTab: FC<ITabProps<GeneratedFood>> = ({
	state,
	isEditable,
}) => {
	const user = useSelector((store: RootStore) => store.userReducer.user);
	const [generatedFoods, setGeneratedFoods] = useState<GeneratedFood[]>([]);

	const { i18n } = useTranslation();

	const getGeneratedFoods = (user: UserActiveSession) => {
		getGeneratedFoodList([Query.equal("generated_for", user.email)]).then(
			(generatedFoodList) => {
				// Tmp fix waiting updates from appwrite
				setGeneratedFoods(generatedFoodList as any); // eslint-disable-line
			},
		);
	};

	useEffect(() => {
		if (!user) {
			return;
		}

		getGeneratedFoods(user);
	}, []);

	if (state === "loading") {
		return <span>Loading. . .</span>;
	} else if (state === "error") {
		return <span>Something went wrong. Please, try again!</span>;
	}
	return (
		<div>
			{isEditable && (
				<GenerateNewFoodModal
					updateGeneratedFoodList={(generatedFood) =>
						setGeneratedFoods((prevGeneratedFoods) => [
							...prevGeneratedFoods,
							generatedFood,
						])
					}
				/>
			)}

			{generatedFoods.length ? (
				<AccordionContainer
					allowToggle
					display={"grid"}
					gap={3}
				>
					<ListWithPagination>
						{generatedFoods.map((foodData) => (
							<Accordion
								key={foodData.$id}
								label={format(
									new Date(foodData.created_at),
									"dd MMMM yyyy HH:mm:ss",
									{
										locale: LOCALE_BY_LANGUAGE[i18n.language],
									},
								)}
							>
								<ReactMarkdown>{foodData.description}</ReactMarkdown>
							</Accordion>
						))}
					</ListWithPagination>
				</AccordionContainer>
			) : (
				<DataNotFound />
			)}
		</div>
	);
};