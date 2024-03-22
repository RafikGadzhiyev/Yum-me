"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export const IndexPageWrapper = () => {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-[100vh] justify-center bg-base-100">
			<div className="hidden max-w-[500px] flex-1 flex-col items-center justify-center  gap-3 bg-base-300 p-2 px-4 md:flex">
				<h1 className="text-center text-xl font-bold">{t("WELCOME_TEXT")}</h1>

				<p className="indent-5">
					Our innovative app is designed to generate delicious and personalized food
					suggestions tailored just for you. Features: Personalized Recommendations:
					Yum Me analyzes your taste preferences, dietary restrictions, and culinary
					cravings to suggest mouthwatering dishes that suit your unique palate.
				</p>
				<p className="indent-5">
					<b>Endless Inspiration</b>: Never run out of ideas for your next meal. Yum
					Me offers a diverse range of recipes, from quick and easy to gourmet
					delights, ensuring there&apos;s always something exciting cooking in your
					kitchen.
				</p>
				<p className="indent-5">
					<b>Effortless Meal Planning</b>: Say goodbye to the stress of meal
					planning. Yum Me helps you create a weekly menu with just a few taps,
					making grocery shopping and cooking a breeze.
				</p>
				<p className="indent-5">
					<b>Random Delights</b>: Feeling adventurous? Let Yum Me surprise you with
					its &quot;Random Delights&quot; feature, offering a serendipitous selection
					of recipes for those moments when you want to try something new.
				</p>
				<p className="indent-5">
					<b>Community Favorites</b>: Discover popular recipes loved by the Yum Me
					community. Share your culinary creations, connect with fellow food
					enthusiasts, and build your own digital cookbook.
				</p>
				<p className="indent-5">
					Yum Me is not just a food app; it&apos;s your culinary companion, inspiring
					you to explore, create, and savor every bite. Download Yum Me now and let
					the flavors unfold!
				</p>
			</div>

			<div className="flex flex-1 flex-col items-center justify-center">
				<h1 className="mb-3 text-center text-xl font-bold md:hidden">
					{t("WELCOME_TEXT")}
				</h1>
				<h2 className="text-center text-lg font-bold">Wanna try?</h2>
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
