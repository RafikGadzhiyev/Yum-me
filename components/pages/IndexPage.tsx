"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export const IndexPageWrapper = () => {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-[100vh] items-center justify-center bg-base-100">
			<div>
				<h1 className="text-center text-lg font-bold">{t("WELCOME_TEXT")}</h1>

				<Link
					href={AUTH_ROUTES.SIGN_IN.path}
					className="btn btn-info mt-3"
				>
					{t("CONTINUE")}
				</Link>
			</div>
		</div>
	);
};
