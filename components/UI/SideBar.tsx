import { SideBarNavigation } from "../feature/SideBarNavigation";

export const SideBar = () => {
	return (
		// <aside className="fixed bottom-0 top-0 z-50 flex h-min w-full rounded-r-md bg-green-300 p-3 px-5 md:static md:h-[100vh] md:w-auto">
		// 	<SideBarNavigation />
		// </aside>
		<div className="drawer-side">
			<div className="drawer-overlay" />

			<SideBarNavigation />
		</div>
	);
};