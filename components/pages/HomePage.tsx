"use client";

import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AppDispatch } from "@/redux/store";
import { format } from "date-fns";
import { User } from "@supabase/supabase-js";

import { useFetch } from "@/hooks/useFetch";
import { useDispatch } from "react-redux";

import { readUser } from "@/redux/slices/user.slice";

import { Accordion as AccordionContainer } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";
import { GenerateNewFoodModal } from "../feature/GenerateNewFoodModal";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

// TODO: REFACTOR
interface IHomePageProps extends PropsWithChildren {
	user: User | null;
	healthData: any;
}

export const HomePage: FC<IHomePageProps> = ({ user, healthData }) => {
	const memoizedHealthData = useMemo(() => healthData, [healthData]);
	const memoizedUser = useMemo(() => user, [user]);

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
		dispatch(readUser(memoizedUser));

		if (memoizedUser?.email) {
			sendRequest(
				"GET",
				`/api/storage/text_generation?email=${memoizedUser.email}`
			).then((data) => {
				if (data) {
					setGeneratedFoods(data);
				}
			});
		}
	}, [memoizedUser, sendRequest, dispatch]);

	useEffect(() => {
		dispatch(readUserHealthData(memoizedHealthData));
	}, [memoizedHealthData, dispatch]);

	return (
		<div className=" flex flex-col gap-2">
			<AccordionContainer
				allowToggle
				display={"grid"}
				gap={3}
			>
				{(generatedFoods as Array<Record<string, string>>).map((item) => (
					<Accordion
						key={item._id} // TODO: Need to fix
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
				/>
			</div>
		</div>
	);
};
