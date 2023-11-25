"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { UserResponse } from "@supabase/supabase-js";

import { useFetch } from "@/hooks/useFetch";

import { Accordion as AccordionContainer, Button } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";
import { GenerateNewFoodButton } from "../feature/GenerateNewFoodButton";

// TODO: REFACTOR
interface IHomePageProps extends PropsWithChildren {
	user: UserResponse;
	data: any;
}

export const HomePage: FC<IHomePageProps> = ({ user, data }) => {
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
	}, [user.data.user?.email, sendRequest]);

	// console.log(generatedFoods);

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
					data={data}
				/>
				<Button>Generate food image</Button>
				<Button>Save generation to Database</Button>
			</div>
		</div>
	);
};
