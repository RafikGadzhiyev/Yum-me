import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE_PAGE_TABS } from "@/consts/tabs.const";
import { Tabs } from "@/components/feature/Tabs";

interface IProfilePageMainProps {
	activeTab: string;
	user: User;
}

export const ProfilePageMain: FC<IProfilePageMainProps> = ({ activeTab, user }) => {
	const router = useRouter();
	const pathname = usePathname();

	const availableTabs = PROFILE_PAGE_TABS.filter(
		(tab) => !tab.roles?.length || tab.roles?.some((role) => user.role === role),
	);

	const onTabChange = async (selectedTabKey: string) => {
		router.push(pathname + `?tab=${selectedTabKey}`);
	};

	return (
		<main>
			<Tabs
				tabs={availableTabs}
				initialCurrentTabKey={activeTab || availableTabs[0].key}
				onChange={onTabChange}
			/>
		</main>
	);
};
