"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export const IndexPageWrapper = () => {
	const { t } = useTranslation();

	return (
		<div className="bg-slate-300 min-h-[100vh] flex items-center justify-center">
			<div>
				{/* <h1 className="font-bold text-2xl mb-2">
					{t("INDEX_PAGE.AUTH_FORM_TITLE")}
				</h1> */}

				<h1>
					Welcome to Yum-me. This is helpfull web-application that helps with food
				</h1>

				<Link href={AUTH_ROUTES.SIGN_IN.path}>Continue</Link>
			</div>
		</div>
	);
};