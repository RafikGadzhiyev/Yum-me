"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Accordion } from "../UI/Accordion";
import { requestToAI } from "@/mocks/AIResponse.mock";
import ReactMarkdown from "react-markdown";
import { Accordion as AccordionContainer, Button } from "@chakra-ui/react";
import { FC, PropsWithChildren, useEffect } from "react";
import { UserResponse } from "@supabase/supabase-js";
import { GenerateNewFoodButton } from "../UI/GenerateNewFoodButton";
import { useFetch } from "@/hooks/useFetch";

interface IHomePageProps extends PropsWithChildren {
	user: UserResponse;
}

export const HomePage: FC<IHomePageProps> = ({ user }) => {
	const { t } = useTranslation();
	const { sendRequest, response } = useFetch();

	const [generatedFoods, setGeneratedFoods] = useState<Record<string, any>[]>(
		[]
	);

	const updateGeneratedFoodList = (generatedFood: Record<string, any>) => {
		setGeneratedFoods((prevGeneratedFoods) => [
			...prevGeneratedFoods,
			generatedFood,
		]);
	};

	useEffect(() => {
		sendRequest(
			"GET",
			`/api/storage/text_generation?email=${user.data.user?.email}`
		);
	}, []);

	// useEffect(() => {
	// 	if (!(response.result?.data as any)?.result) return;

	// 	setGeneratedFoods((pregGeneratedFoods) => [
	// 		...pregGeneratedFoods,
	// 		(response.result?.data as any)?.result,
	// 	]);
	// }, [response.result?.data]);

	console.log(generatedFoods);

	const WEEK_DAYS = Object.entries(t("DAY_OF_WEEK", { returnObjects: true }));
	return (
		<div className=" flex flex-col gap-2">
			<AccordionContainer
				allowToggle
				display={"grid"}
				gap={3}
			>
				{(generatedFoods as Array<Record<string, string>>).map((item) => (
					<Accordion
						key={item.generatedDate} // TODO: Need to fix
						label={format(
							new Date(item.generatedDate),
							"dd MMMM yyyy HH:MM:SS"
						)}
					>
						<ReactMarkdown>{item.food}</ReactMarkdown>
					</Accordion>
				))}
			</AccordionContainer>
			<div>
				<GenerateNewFoodButton
					email={user.data.user?.email || ""}
					updateGeneratedFoodList={updateGeneratedFoodList}
				/>
				<Button>Generate food image</Button>
				<Button>Save generation to Database</Button>
			</div>
		</div>
	);
};
