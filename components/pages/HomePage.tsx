"use client";
import { useTranslation } from "react-i18next";
import { Accordion } from "../UI/Accordion";

export const HomePage = () => {
	const { t } = useTranslation();

	return (
		<div className=" flex flex-col gap-2">
			{(t("DAY_OF_WEEK", { returnObjects: true }) as Array<string>).map(
				(day) => (
					<Accordion
						key={day}
						label={day}
					>
						AI GENERATED
					</Accordion>
				)
			)}
		</div>
	);
};
