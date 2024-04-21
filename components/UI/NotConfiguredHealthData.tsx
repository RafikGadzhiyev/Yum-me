import { FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ROUTES } from "@/consts/routes.const";

export const NotConfiguredHealthData = () => {
	const { t } = useTranslation();

	return (
		<div className="absolute left-0 top-0 flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-md  bg-black/50 text-white backdrop-blur-sm">
			<div className="grid place-items-center text-5xl">
				<FaLock />
				<span className="text-lg">{t("TO_GET_FULLY_ACCESS_HINT")}</span>
			</div>
			<Link
				href={ROUTES.SETTINGS.path}
				className="my-3 rounded-md bg-orange-400 p-2 transition hover:bg-orange-500 active:bg-orange-600"
			>
				{t("CONFIGURE")}
			</Link>
		</div>
	);
};
