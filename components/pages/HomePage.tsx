"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { User as UserSession } from "@supabase/supabase-js";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFetch } from "@/hooks/useFetch";

import { readUser } from "@/redux/slices/user.slice";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { HOME_PAGE_TABS } from "@/consts/tabs.const";

interface IHomePageProps extends PropsWithChildren {
	user: UserSession | null;
	healthData: User;
}

export const HomePage: FC<IHomePageProps> = ({ user, healthData }) => {
	const dispatch = useDispatch<AppDispatch>();

	const { t } = useTranslation();
	const { sendRequest, responseStatus } = useFetch();

	const [list, setList] = useState<any[]>([]); // eslint-disable-line

	const getCurrentTabDataList = async (tabIndex: number) => {
		const tab = HOME_PAGE_TABS[tabIndex];
		let generatedFoodList;

		switch (tab.key) {
			case "POSTS":
				// getPosts()
				setList([]);
				break;
			case "GENERATED_FOODS":
				generatedFoodList = await getGeneratedFoods();

				setList(generatedFoodList);
				break;
			default:
				setList([]);
		}
	};

	const getGeneratedFoods = async () => {
		if (user?.email) {
			return await sendRequest(
				"GET",
				`/api/storage/text_generation?email=${user.email}`,
			).then((data) => {
				if (data) {
					return data.reverse();
				}
			});
		}

		return Promise.resolve([]);
	};

	const updateList = (newValue: unknown) => {
		if (Array.isArray(newValue)) {
			setList(newValue);

			return;
		}

		setList((prevValue) => [newValue, ...prevValue]);
	};

	useEffect(() => {
		dispatch(readUser(user));
	}, [user, sendRequest, dispatch]);

	useEffect(() => {
		dispatch(readUserHealthData(healthData));
	}, [healthData, dispatch]);

	return (
		<div className=" flex flex-col gap-2">
			<div>
				<Tabs
					onChange={getCurrentTabDataList}
					isManual
					isFitted
					isLazy
				>
					<TabList>
						{HOME_PAGE_TABS.map((tab) => (
							<Tab key={tab.key}>{t(tab.key)}</Tab>
						))}
					</TabList>

					<TabPanels>
						{HOME_PAGE_TABS.map((tab) => (
							<TabPanel key={tab.key}>
								<tab.Component
									list={list}
									state={responseStatus}
									updateList={updateList}
									isEditable={true}
								/>
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
			</div>
		</div>
	);
};