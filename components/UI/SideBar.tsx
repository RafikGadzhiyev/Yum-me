import { SideBarNavigation } from "../feature/SideBarNavigation";

export const SideBar = () => {
	return (
		<aside className="flex p-3 px-5 rounded-r-md bottom-0 bg-green-300 md:static md:w-auto">
			<SideBarNavigation />
		</aside>
	);
};
