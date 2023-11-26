"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AppDispatch } from "@/redux/store";
import { format } from "date-fns";
import { User } from "@supabase/supabase-js";

import { useFetch } from "@/hooks/useFetch";
import { useDispatch } from "react-redux";

import { readUser } from "@/redux/slices/user.slice";

import { Accordion as AccordionContainer, Button } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";
import { GenerateNewFoodModal } from "../feature/GenerateNewFoodModal";

// TODO: REFACTOR
interface IHomePageProps extends PropsWithChildren {
	user: User | null;
	data: any;
}

export const HomePage: FC<IHomePageProps> = ({ user, data }) => {
	const { sendRequest } = useFetch();
	const dispatch = useDispatch<AppDispatch>();

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
		dispatch(readUser(user));

		sendRequest("GET", `/api/storage/text_generation?email=${user?.email}`);
	}, [user?.email, sendRequest, dispatch]);

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
				<GenerateNewFoodModal
					email={user?.email || ""}
					updateGeneratedFoodList={updateGeneratedFoodList}
					data={data}
				/>
				<Button>Generate food image</Button>
				<Button>Save generation to Database</Button>
			</div>
		</div>
	);
};
