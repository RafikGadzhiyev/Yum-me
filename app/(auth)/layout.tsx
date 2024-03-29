import { LanguageSelect } from "@/components/feature/LanguageSelect";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex h-[100dvh]">
			<div className="hidden max-w-[400px] flex-1 flex-col items-center justify-center  gap-3 bg-base-300 p-2 px-4 md:flex">
				<h1 className="text-md mb-3 text-center font-bold lg:text-lg">
					Hungry but can&apos;t decide what to eat? Let Yum Me take the guesswork out
					of meal planning.
				</h1>

				<div className="text-sm">
					<p className="indent-5">
						Our innovative app is designed to generate delicious and personalized
						food suggestions tailored just for you. Features: Personalized
						Recommendations: Yum Me analyzes your taste preferences, dietary
						restrictions, and culinary cravings to suggest mouthwatering dishes that
						suit your unique palate.
					</p>
					<p className="indent-5">
						<b>Endless Inspiration</b>: Never run out of ideas for your next meal.
						Yum Me offers a diverse range of recipes, from quick and easy to gourmet
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
						its &quot;Random Delights&quot; feature, offering a serendipitous
						selection of recipes for those moments when you want to try something
						new.
					</p>
					<p className="indent-5">
						<b>Community Favorites</b>: Discover popular recipes loved by the Yum Me
						community. Share your culinary creations, connect with fellow food
						enthusiasts, and build your own digital cookbook.
					</p>
					<p className="indent-5">
						Yum Me is not just a food app; it&apos;s your culinary companion,
						inspiring you to explore, create, and savor every bite. Download Yum Me
						now and let the flavors unfold!
					</p>
				</div>

				<LanguageSelect />
			</div>
			<div className="flex flex-1 items-center justify-center">{children}</div>
		</div>
	);
}
