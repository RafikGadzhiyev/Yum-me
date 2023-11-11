"use client";

import { FC, PropsWithChildren } from "react";

import "./../i18n/i18n_instance";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<CacheProvider>
			<ChakraProvider>{children}</ChakraProvider>;
		</CacheProvider>
	);
};
