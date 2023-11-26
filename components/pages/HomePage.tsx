"use client";

import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { User } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";

import { useFetch } from "@/hooks/useFetch";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { readUser } from "@/redux/slices/user.slice";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

import { Accordion as AccordionContainer } from "@chakra-ui/react";
import { Accordion } from "../UI/Accordion";
import { GenerateNewFoodModal } from "../feature/GenerateNewFoodModal";

interface IHomePageProps extends PropsWithChildren {
	user: User | null;
	healthData: any;
}

export const HomePage: FC<IHomePageProps> = ({ user, healthData }) => {
	const memoizedHealthData = useMemo(() => healthData, [healthData]);
	const memoizedUser = useMemo(() => user, [user]);

	const dispatch = useDispatch<AppDispatch>();

	const { i18n } = useTranslation();
	const { sendRequest } = useFetch();

	const [generatedFoods, setGeneratedFoods] = useState<Record<string, any>[]>([]);

	const updateGeneratedFoodList = (generatedFood: Record<string, any>) => {
		setGeneratedFoods((prevGeneratedFoods) => [
			generatedFood,
			...prevGeneratedFoods,
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
					setGeneratedFoods(data.reverse());
				}
			});
		}
	}, [memoizedUser, sendRequest, dispatch]);

	useEffect(() => {
		dispatch(readUserHealthData(memoizedHealthData));
	}, [memoizedHealthData, dispatch]);

	return (
		<div className=" flex flex-col gap-2">
			<div>
				<GenerateNewFoodModal
					email={user?.email || ""}
					updateGeneratedFoodList={updateGeneratedFoodList}
				/>
			</div>

			<AccordionContainer
				allowToggle
				display={"grid"}
				gap={3}
			>
				{(generatedFoods as Array<Record<string, string>>).map((item) => (
					<Accordion
						key={item._id}
						label={format(new Date(item.generatedDate), "dd MMMM yyyy HH:mm:ss", {
							locale: LOCALE_BY_LANGUAGE[i18n.language],
						})}
					>
						<ReactMarkdown>{item.food}</ReactMarkdown>
					</Accordion>
				))}
			</AccordionContainer>
		</div>
	);
};
