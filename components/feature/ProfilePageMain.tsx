import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PROFILE_PAGE_TABS } from "@/consts/tabs.const";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "@/hooks/useFetch";
import { usePathname, useRouter } from "next/navigation";

interface IProfilePageMainProps {
	activeTab: number;
	user: User;
}

export const ProfilePageMain: FC<IProfilePageMainProps> = ({ activeTab, user }) => {
	const router = useRouter();
	const pathname = usePathname();

	// const isEditableTab = useRef(false);

	const { responseStatus } = useFetch();
	const { t } = useTranslation();

	const availableTabs = PROFILE_PAGE_TABS.filter(
		(tab) => !tab.roles?.length || tab.roles?.some((role) => user.role === role),
	);

	const onTabChange = async (chosenTab: number) => {
		router.push(pathname + `?tab=${chosenTab}`);
	};

	return (
		<main>
			<Tabs
				defaultIndex={activeTab}
				onChange={onTabChange}
				isManual
				isFitted
				isLazy
			>
				<TabList>
					{availableTabs.map((tab) => (
						<Tab key={tab.key}>{t(tab.key)}</Tab>
					))}
				</TabList>

				<TabPanels>
					{availableTabs.map((tab) => (
						<TabPanel key={tab.key}>
							<tab.Component
								state={responseStatus}
								isEditable={true}
							/>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</main>
	);
};
