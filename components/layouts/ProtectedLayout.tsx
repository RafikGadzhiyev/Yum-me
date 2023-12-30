"use client";

import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { account } from "@/app/appwrite";
import { useRouter, usePathname } from "next/navigation";
import { AUTH_ROUTES, ROUTES } from "@/consts/routes.const";

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();

	const getUser = useCallback(async () => {
		const authRoutesPathList = Object.values(AUTH_ROUTES).map(
			(authRoute) => authRoute.path,
		);

		try {
			const user = await account.get();

			if (user && authRoutesPathList.includes(pathname)) {
				router.push(ROUTES.HOME.path);
			}
		} catch (err) {
			if (!authRoutesPathList.includes(pathname)) {
				router.push(AUTH_ROUTES.SIGN_IN.path);
			}
		}
	}, [pathname, router]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	return <>{children}</>;
};