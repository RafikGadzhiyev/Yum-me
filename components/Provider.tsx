"use client";

import { FC, PropsWithChildren } from "react";

import "./../i18n/i18n_instance";
import { ChakraProvider } from "@chakra-ui/react";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};
