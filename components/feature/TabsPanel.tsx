import { useContext } from "react";
import { TabsContext } from "@/contexts/tabs.context";
import { useTranslation } from "react-i18next";

import clsx from "clsx";

export const TabsPanel = () => {
	const { tabs, currentTabKey, onChange } = useContext<TabContext>(TabsContext);
	const { t } = useTranslation();

	return (
		<div className="mb-3 flex items-center">
			{tabs.map((tab) => (
				<div
					role="button"
					className={clsx("btn btn-ghost flex-1 rounded-md", {
						"bg-base-300": currentTabKey === tab.key,
					})}
					key={tab.key}
					onClick={() => onChange(tab.key)}
				>
					{t(tab.key)}
				</div>
			))}
		</div>
	);
};
