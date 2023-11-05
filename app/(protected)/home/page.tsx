import { FaLock } from "react-icons/fa";
import { Accordion } from "@/components/UI/Accordion";
import { HomePage } from "@/components/pages/HomePage";
import Link from "next/link";

export default function MainPage() {
	return (
		<div
			className="grid gap-4 relative w-full min-h-full"
			tabIndex={0}
		>
			<HomePage />
			<div className="absolute rounded-md top-0 left-0 bg-black/50 w-full h-full text-white flex  flex-col items-center justify-center">
				<div className="text-5xl grid place-items-center">
					<FaLock />
					<span className="text-lg">
						To get access You need fully configure your food wishes and
						additional info
					</span>
				</div>
				<Link
					href="/settings"
					className="rounded-md p-2 my-3 bg-orange-400 transition hover:bg-orange-500 active:bg-orange-600"
				>
					Configure
				</Link>
			</div>
		</div>
	);
}
