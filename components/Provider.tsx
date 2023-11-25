"use client";

import { FC, PropsWithChildren } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

import "./../i18n/i18n_instance";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<CacheProvider>
			<ChakraProvider>{children}</ChakraProvider>
		</CacheProvider>
	);
};
