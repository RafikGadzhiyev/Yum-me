"use client";

import { HTMLAttributes, FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
	dictionaryKey: string;
	clickHandler: () => void;
}

export const Button: FC<IButtonProps> = ({ dictionaryKey, clickHandler }) => {
	const { t } = useTranslation();

	useEffect(() => {}, []);

	return (
		<button
			className="mt-auto font-bold text-lg"
			onClick={() => clickHandler()}
		>
			{t(dictionaryKey)}
		</button>
	);
};
