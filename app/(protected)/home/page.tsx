import { HomePage } from "@/components/pages/HomePage";

export default async function MainPage() {
	return (
		<div
			className="relative grid min-h-full w-full gap-4"
			tabIndex={0}
		>
			<HomePage />
		</div>
	);
}