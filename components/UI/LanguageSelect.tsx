"use client";

import { LANGUAGES } from "@/i18n/dictionary";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

export const LanguageSelect = () => {
	const { i18n } = useTranslation();

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
				Choose Language
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
