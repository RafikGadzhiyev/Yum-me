"use client";
import { useTranslation } from "react-i18next";
import { Accordion } from "../UI/Accordion";

export const HomePage = () => {
	const { t } = useTranslation();

	const WEEK_DAYS = Object.entries(t("DAY_OF_WEEK", { returnObjects: true }));

	return (
		<div className=" flex flex-col gap-2">
			{WEEK_DAYS.map(([key, day]) => (
				<Accordion
					key={key}
					label={day.LONG}
				>
					AI GENERATED
				</Accordion>
			))}
		</div>
	);
};
