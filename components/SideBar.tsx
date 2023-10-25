// import { useLoading } from "@/hooks/useLoading";
// import { Loading } from "./UI/Loading";
import { SignOutButton } from "./UI/Buttons";
import { SideBarNavigation } from "./SideBarNavigation";

export const SideBar = () => {
	return (
		<aside className="grid p-2 px-4 bottom-0 w-full bg-green-300 md:static md:w-auto">
			<SideBarNavigation />
			<SignOutButton dictionaryKey="SIGN_OUT" />
			{/* {isLoading && <Loading />} */}
		</aside>
	);
};
