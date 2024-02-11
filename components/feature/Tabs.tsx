import { FC, useState } from "react";
import { TabsContext } from "@/contexts/tabs.context";
import { TabsPanel } from "@/components/feature/TabsPanel";
import { TabContent } from "@/components/feature/TabContent";

interface ITabsProps {
	onChange: (tabKey: string) => void;
	tabs: Tab[];
	initialCurrentTabKey: string;
}

export const Tabs: FC<ITabsProps> = ({ tabs, initialCurrentTabKey, onChange }) => {
	const [tabKey, setTabKey] = useState(initialCurrentTabKey);

	const initialContextValue = {
		tabs,
		onChange,
		currentTabKey: tabKey,
	};

	initialContextValue.onChange = (tabKey: string) => {
		setTabKey(tabKey);
		onChange(tabKey);
	};

	return (
		<div>
			<TabsContext.Provider value={initialContextValue}>
				<TabsPanel />
				<TabContent />
			</TabsContext.Provider>
		</div>
	);
};
