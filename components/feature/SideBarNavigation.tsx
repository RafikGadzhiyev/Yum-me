"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

import { ROUTE_LIST } from "@/consts/routes.const";

import { LanguageSelect } from "./LanguageSelect";
import { SignOutButton } from "../UI/Buttons";

export const SideBarNavigation = () => {
	const { t } = useTranslation();

	return (
		<nav className="menu h-full bg-base-200 px-5 py-2.5">
			<ul className="mb-3 block items-center justify-between text-lg font-semibold md:block">
				{ROUTE_LIST.map((route) => (
					<li
						key={route.key}
						className="mt-2 overflow-hidden rounded-md transition"
					>
						<Link href={route.path}>
							{route.Icon && <route.Icon />}
							{t(`NAVIGATION.${route.key.toUpperCase()}`)}
						</Link>
					</li>
				))}
			</ul>
			<div className="mt-auto flex flex-col gap-4 ">
				<LanguageSelect />
				<SignOutButton dictionaryKey="SIGN_OUT" />
			</div>
		</nav>
	);
};