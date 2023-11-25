"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaListUl } from "react-icons/fa";
import Link from "next/link";
import clsx from "clsx";

import { ROUTE_LIST } from "@/configs/routes.config";

import { LanguageSelect } from "./LanguageSelect";
import { SignOutButton } from "../UI/Buttons";

export const SideBarNavigation = () => {
	const { t } = useTranslation();

	const [isOpened, setIsOpened] = useState(false);

	return (
		<nav className="flex-1 flex flex-col md:flex-col-reverse">
			<div className="flex items-center justify-between w-full mt-auto">
				<div className="block md:hidden">
					<button
						className="rounded-md transition hover:bg-green-200 p-2 my-2"
						onClick={() => setIsOpened(!isOpened)}
					>
						<FaListUl />
					</button>
				</div>
				<div className="flex mt-auto md:flex-col gap-3">
					<LanguageSelect />
					<SignOutButton dictionaryKey="SIGN_OUT" />
				</div>
			</div>
			<ul
				className={clsx(
					"font-semibold text-lg block items-center justify-between mb-3 md:block",
					{
						hidden: !isOpened,
						block: isOpened,
					}
				)}
			>
				{ROUTE_LIST.map((route) => (
					<li
						key={route.key}
						className="overflow-hidden transition rounded-md  hover:bg-green-200"
						onClick={() => setIsOpened(false)}
					>
						<Link
							href={route.path}
							className="w-full p-2 flex items-center gap-4"
						>
							{route.Icon && <route.Icon />}
							{t(`NAVIGATION.${route.key.toUpperCase()}`)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
