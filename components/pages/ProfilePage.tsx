"use client";

import { FC } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GeneratedFoodsTab } from "../feature/GeneratedFoodsTab";
import { Database } from "@/table-types";

interface IProfilePageWrapper {
	user: Database["public"]["Tables"]["User"]["Row"];
}

export const ProfilePageWrapper: FC<IProfilePageWrapper> = ({ user }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const activeTab = +(searchParams.get("tab") as string) || 0;

	let fullname = user.name + user.last_name;

	return (
		<div>
			<header className="flex flex-col items-center py-2 h-[400px]">
				<div className="w-[100px] h-[100px] mb-3 rounded-full bg-gray-400"></div>
				<span className="font-bold text-2xl">{fullname}</span>
				<div>
					<h1>User&apos;s health config:</h1>
					<pre>{user.age}</pre>
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
						<Tab _selected={{ borderBottomColor: "green.500" }}>Generated foods</Tab>
						<Tab _selected={{ borderBottomColor: "green.500" }}>Liked</Tab>
					</TabList>

					<TabPanels>
						<TabPanel></TabPanel>
						<TabPanel>
							<GeneratedFoodsTab />
						</TabPanel>
						<TabPanel></TabPanel>
					</TabPanels>
				</Tabs>
			</main>
		</div>
	);
};
