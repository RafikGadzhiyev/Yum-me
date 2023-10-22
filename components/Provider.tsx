"use client";

import { FC, PropsWithChildren } from "react";
// import { I18nProvider, FormattedString } from "i18nLib";

import "./../i18n/i18n_instance";
import { useTranslation } from "react-i18next";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return <>{children}</>;
};
