"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTE_LIST } from "@/configs/routes.config";
import { FaListUl } from "react-icons/fa";
import clsx from "clsx";

// TODO: Add transition

export const SideBarNavigation = () => {
	const { t } = useTranslation();

	const [isOpened, setIsOpened] = useState(false);

	return (
		<nav>
			<div className="block md:hidden">
				<button
					className="rounded-md transition hover:bg-green-200 p-2 my-2"
					onClick={() => setIsOpened(!isOpened)}
				>
					<FaListUl />
				</button>
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
					>
						<Link
							href={route.path}
							className="w-full p-2 flex items-center gap-4"
						>
							<route.Icon />
							{t(`NAVIGATION.${route.key.toUpperCase()}`)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
