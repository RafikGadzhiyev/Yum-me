"use client";

import { FC, PropsWithChildren } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

import "./../i18n/i18n_instance";
import { store } from "@/redux/store";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ReduxProvider store={store}>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
		</ReduxProvider>
	);
};