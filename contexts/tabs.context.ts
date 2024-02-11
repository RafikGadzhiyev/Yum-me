import { createContext } from "react";

export const TabsContext = createContext<TabContext>({
	tabs: [],
	onChange: () => void 0,
});
