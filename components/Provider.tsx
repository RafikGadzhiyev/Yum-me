"use client";

import { FC, PropsWithChildren } from "react";

import "./../i18n/i18n_instance";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return <>{children}</>;
};
