"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export const SideBarNavigation = () => {
	const { t } = useTranslation();

	const LINKS = Object.entries(
		t("NAVIGATION", {
			returnObjects: true,
		})
	);

	return (
		<nav>
			<ul className="font-semibold text-lg flex items-center justify-between md:block">
				{LINKS.map(([link, label]) => (
					<li
						key={"link-" + label}
						className="hover:underline"
					>
						<Link href={link.toLowerCase()}>{label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
