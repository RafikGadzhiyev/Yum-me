"use client";

import { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFetch } from "@/hooks/useFetch";

import { readUser } from "@/redux/slices/user.slice";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { HOME_PAGE_TABS } from "@/consts/tabs.const";
import { Query, UserActiveSession, Document } from "@/app/appwrite";
import { isConfigured } from "@/utils/validation.util";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { ROUTES } from "@/consts/routes.const";
import { getSession } from "@/api/auth";
import { getUsers } from "@/api/user";
import { getGeneratedFoodList } from "@/api/generatedFood";

export const HomePage = () => {
	const [userSession, setUserSession] = useState<null | UserActiveSession>(null);
	const [userHealthData, setUserHealthData] = useState<null | Document>(null);

	const dispatch = useDispatch<AppDispatch>();

	const { t } = useTranslation();
	const { sendRequest, responseStatus } = useFetch();

	const [list, setList] = useState<any[]>([]); // eslint-disable-line

	const getCurrentTabDataList = async (tabIndex: number) => {
		const tab = HOME_PAGE_TABS[tabIndex];
		let generatedFoodList = [];

		switch (tab.key) {
			case "POSTS":
				// getPosts()
				break;
			case "GENERATED_FOODS":
				generatedFoodList = (await getGeneratedFoods()) as any[]; // eslint-disable-line

				setList(generatedFoodList);
				break;
			default:
				generatedFoodList = [];
				break;
		}

		setList(generatedFoodList);
	};

	const getGeneratedFoods = async () => {
		if (userSession?.email) {
			return await getGeneratedFoodList([
				Query.equal("generated_for", userSession.email),
			]);
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
		dispatch(readUser(userSession));
	}, [userSession, sendRequest, dispatch]);

	useEffect(() => {
		console.log(userHealthData);
		dispatch(readUserHealthData(userHealthData));
	}, [userHealthData, dispatch]);

	// TODO: Create scalable function that returns user and documents
	useEffect(() => {
		getSession().then((userSession) => {
			setUserSession(userSession);

			getUsers([Query.equal("email", userSession.email)]).then((users) => {
				setUserHealthData(users[0]);
			});
		});
	}, []);

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

			{!isConfigured(userHealthData) && (
				<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center  rounded-md bg-black/50 text-white">
					<div className="grid place-items-center text-5xl">
						<FaLock />
						<span className="text-lg">
							To get access You need fully configure your food wishes and additional
							info
						</span>
					</div>
					<Link
						href={ROUTES.SETTINGS.path}
						className="my-3 rounded-md bg-orange-400 p-2 transition hover:bg-orange-500 active:bg-orange-600"
					>
						Configure
					</Link>
				</div>
			)}
		</div>
	);
};