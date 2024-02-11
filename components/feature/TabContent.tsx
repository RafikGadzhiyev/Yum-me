import { useContext } from "react";
import { TabsContext } from "@/contexts/tabs.context";

export const TabContent = () => {
	const { tabs, currentTabKey } = useContext(TabsContext);

	const currentTab = tabs.find((tab) => tab.key === currentTabKey);

	if (!currentTab) {
		return <div>Something went wrong</div>;
	}

	return <div>{<currentTab.Component />}</div>;
};
