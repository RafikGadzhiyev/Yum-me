import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PROFILE_PAGE_TABS } from "@/consts/tabs.const";
import { Roles } from "@/enums/roles.enum";
import { FC, useRef } from "react";
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

	const isEditableTab = useRef(false);

	const { responseStatus } = useFetch();
	const { t } = useTranslation();

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
									state={responseStatus}
									isEditable={true}
								/>
							</TabPanel>
						) : null,
					)}
				</TabPanels>
			</Tabs>
		</main>
	);
};