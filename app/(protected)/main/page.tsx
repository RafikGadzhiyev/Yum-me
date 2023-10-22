import { Accordion } from "@/components/UI/Accordion";

export default function MainPage() {
	return (
		<div className="grid gap-4">
			<Accordion label="Monday">
				<div>Food for Monday</div>
			</Accordion>
		</div>
	);
}
