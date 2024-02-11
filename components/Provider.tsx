"use client";

import { FC, PropsWithChildren } from "react";

import { Provider as ReduxProvider } from "react-redux";

import "./../i18n/i18n_instance";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ReduxProvider store={store}>
			{children}
			<ToastContainer />
		</ReduxProvider>
	);
};
