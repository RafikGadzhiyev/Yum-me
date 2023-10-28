"use client";
import { useTranslation } from "react-i18next";
import { Accordion } from "../UI/Accordion";
import { useEffect, useRef } from "react";

export const HomePage = () => {
	const { t } = useTranslation();

	const WEEK_DAYS = useRef<[string, any][]>([]);

	useEffect(() => {
		WEEK_DAYS.current = Object.entries(
			t("DAY_OF_WEEK", { returnObjects: true })
		);
	}, []);

	return (
		<div className=" flex flex-col gap-2">
			{WEEK_DAYS.current.map(([key, day]) => (
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
