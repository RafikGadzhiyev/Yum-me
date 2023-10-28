"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTE_LIST } from "@/configs/routes.config";

export const SideBarNavigation = () => {
	const { t } = useTranslation();

	return (
		<nav>
			<ul className="font-semibold text-lg flex items-center justify-between md:block">
				{ROUTE_LIST.map((route) => (
					<li
						key={route.key}
						className="hover:underline"
					>
						<Link href={route.path}>
							{t(`NAVIGATION.${route.key.toUpperCase()}`)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
