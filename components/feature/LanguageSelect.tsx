"use client";

import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import { LANGUAGES } from "@/i18n/dictionary";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export const LanguageSelect = () => {
	const { t, i18n } = useTranslation();

	const changeLanguage = (languageKey: string) => {
		i18n.changeLanguage(languageKey);
	};

	return (
		<Menu>
			<MenuButton
				as={Button}
				className="rounded-md p-2 bg-white"
				rightIcon={<FaChevronDown />}
			>
				{t("CHANGE_LANGUAGE")}
			</MenuButton>
			<MenuList
				className="rounded-md bg-white p-2"
				zIndex={10000}
				width={""}
			>
				{LANGUAGES.map((language) => (
					<MenuItem
						key={language}
						className="p-2 transition hover:bg-slate-100 rounded-md"
						onClick={() => changeLanguage(language)}
					>
						{language}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};