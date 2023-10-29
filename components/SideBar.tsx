import { SideBarNavigation } from "./SideBarNavigation";

export const SideBar = () => {
	return (
		<aside className="flex p-3 px-5 rounded-r-md bottom-0 bg-green-300 md:static md:w-auto">
			<SideBarNavigation />
			{/* <div className="flex mt-auto md:flex-col gap-3">
				<LanguageSelect />
				<SignOutButton dictionaryKey="SIGN_OUT" />
			</div> */}
			{/* {isLoading && <Loading />} */}
		</aside>
	);
};
