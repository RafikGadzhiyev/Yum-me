"use client";

import { useTranslation } from "react-i18next";

export const SearchPageWrapper = () => {
	const { t } = useTranslation();

	return (
		<>
			<form className="flex  gap-2">
				<input
					className=" border-none outline-none rounded-md p-2 py-1 flex-1"
					placeholder="Search recipes"
				/>

				<button className="rounded-md px-2 bg-green-300 transition hover:bg-green-400 hover:text-white">
					{t("SEARCH")}
				</button>
			</form>
		</>
	);
};
