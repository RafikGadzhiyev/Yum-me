"use client";

import { FC, useEffect, useState } from "react";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useFetch } from "@/hooks/useFetch";
import { useDispatch } from "react-redux";

import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

import { PROFILE_PAGE_TABS } from "@/consts/tabs.const";
import { Roles } from "@/enums/roles.enum";

// TODO: refactor, duplicated code

interface IProfilePageWrapper {
	user: User;
}

export const ProfilePageWrapper: FC<IProfilePageWrapper> = ({ user }) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();

	const { sendRequest, responseStatus } = useFetch();
	const { t } = useTranslation();

	const [list, setList] = useState<any[]>([]); // eslint-disable-line

	const activeTab = +(searchParams.get("tab") as string) || 0;

	const fullname = user.name + user.last_name;

	const getCurrentTabDataList = async (tabIndex: number) => {
		const tab = PROFILE_PAGE_TABS[tabIndex];
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

	const updateList = function <T>(newValue: T) {
		setList((prevValue) => [newValue, ...prevValue]);
	};

	const onTabChange = async (chosenTab: number) => {
		router.push(pathname + `?tab=${chosenTab}`);

		await getCurrentTabDataList(chosenTab);
	};

	useEffect(() => {
		dispatch(readUserHealthData(user));
	}, [user, dispatch]);

	return (
		<div>
			<header className="flex h-[350px] flex-col items-center py-2">
				<div className="mb-3 h-[100px] w-[100px] rounded-full bg-gray-400"></div>
				<span className="text-3xl font-bold">{fullname}</span>
				<div>
					<h1 className="mb-2 text-center text-xl font-bold">User info</h1>
					<div className="flex items-center gap-3">
						<span>Age: {user.age}</span>
						<span>Gender: {user.gender}</span>
					</div>

					<div className="flex items-center gap-3">
						<span>Weight: {user.weight}</span>
						<span>Height: {user.height}</span>
					</div>
				</div>
			</header>
			<main>
				<Tabs
					defaultIndex={activeTab}
					onChange={onTabChange}
					isManual
					isFitted
					isLazy
				>
					<TabList>
						{PROFILE_PAGE_TABS.map((tab) =>
							!tab.roles || tab.roles.includes(user.role as Roles) ? (
								<Tab key={tab.key}>{t(tab.key)}</Tab>
							) : null,
						)}
					</TabList>

					<TabPanels>
						{PROFILE_PAGE_TABS.map((tab) =>
							!tab.roles || tab.roles.includes(user.role as Roles) ? (
								<TabPanel key={tab.key}>
									<tab.Component
										list={list}
										state={responseStatus}
										updateList={updateList}
										isEditable={false}
									/>
								</TabPanel>
							) : null,
						)}
					</TabPanels>
				</Tabs>
			</main>
		</div>
	);
};