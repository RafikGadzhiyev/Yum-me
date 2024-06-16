"use client";

import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import { LANGUAGES } from "@/i18n/dictionary";

export const LanguageSelect = () => {
	const { t, i18n } = useTranslation();

	const changeLanguage = async (languageKey: string) => {
		await i18n.changeLanguage(languageKey);
	};

	return (
		<div className="dropdown dropdown-top">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-outline m-1"
			>
				{t("CHANGE_LANGUAGE")}
				<FaChevronDown />
			</div>
			<ul
				tabIndex={0}
				className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
			>
				{LANGUAGES.map((language) => (
					<li
						key={language}
						onClick={() => changeLanguage(language)}
					>
						<a>{language}</a>
					</li>
				))}
			</ul>
		</div>
	);
};
