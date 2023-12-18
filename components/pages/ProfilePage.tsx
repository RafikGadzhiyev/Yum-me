"use client";

import { FC, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GeneratedFoodsTab } from "../feature/GeneratedFoodsTab";
import { Database } from "@/table-types";
import { useDispatch } from "react-redux";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

interface IProfilePageWrapper {
	user: Database["public"]["Tables"]["User"]["Row"];
}

export const ProfilePageWrapper: FC<IProfilePageWrapper> = ({ user }) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();

	const activeTab = +(searchParams.get("tab") as string) || 0;

	let fullname = user.name + user.last_name;

	useEffect(() => {
		console.log(user);
		dispatch(readUserHealthData(user));
	}, [user, dispatch]);

	return (
		<div>
			<header className="flex flex-col items-center py-2 h-[350px]">
				<div className="w-[100px] h-[100px] mb-3 rounded-full bg-gray-400"></div>
				<span className="font-bold text-3xl">{fullname}</span>
				{/*TODO: Add styles*/}
				<div>
					<h1 className="text-center font-bold text-xl mb-2">User info</h1>
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
					onChange={(e) => router.push(pathname + `?tab=${e}`)}
					isManual
					isFitted
					isLazy
				>
					<TabList>
						<Tab _selected={{ borderBottomColor: "green.500" }}>Posts</Tab>
						<Tab _selected={{ borderBottomColor: "green.500" }}>
							Generated foods ({user.generated_foods?.length})
						</Tab>
						<Tab _selected={{ borderBottomColor: "green.500" }}>Likes</Tab>
					</TabList>

					<TabPanels>
						<TabPanel></TabPanel>
						<TabPanel>
							{/*TODO: update in database*/}
							<GeneratedFoodsTab
								list={(user.generated_foods || []) as any[]}
								state="success"
								updateList={() => {}}
							/>
						</TabPanel>
						<TabPanel></TabPanel>
					</TabPanels>
				</Tabs>
			</main>
		</div>
	);
};