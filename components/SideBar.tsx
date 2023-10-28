import { SignOutButton } from "./UI/Buttons";
import { SideBarNavigation } from "./SideBarNavigation";
import { LanguageSelect } from "./UI/LanguageSelect";

export const SideBar = () => {
	return (
		<aside className="grid p-3 px-5 rounded-r-md bottom-0 bg-green-300 md:static md:w-auto">
			<SideBarNavigation />
			<footer className="flex mt-auto flex-col gap-3">
				<LanguageSelect />
				<SignOutButton dictionaryKey="SIGN_OUT" />
			</footer>
			{/* {isLoading && <Loading />} */}
		</aside>
	);
};
