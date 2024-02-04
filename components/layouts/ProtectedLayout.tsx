"use client";

import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AUTH_ROUTES, ROUTES } from "@/consts/routes.const";
import { auth } from "@/lib/firabase";
import { readUserSession } from "@/redux/slices/userSession.slice";
import { useDispatch } from "react-redux";
import { readUserHealthData } from "@/redux/slices/user.slice";

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();

	const getUser = useCallback(async () => {
		const authRoutesPathList = Object.values(AUTH_ROUTES).map(
			(authRoute) => authRoute.path,
		);

		try {
			await auth.authStateReady(); // waiting until auth state will be ready
			const user = auth.currentUser;

			if (user) {
				// @ts-expect-error type mismatch
				dispatch(readUserSession(user.toJSON()));

				const userResponse = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + `/api/user?email=${user.email}`,
				);
				const userRecord = await userResponse.json();

				dispatch(readUserHealthData(userRecord.data));

				if (authRoutesPathList.includes(pathname)) {
					router.push(ROUTES.HOME.path);
				}
			}
		} catch (err) {
			if (!authRoutesPathList.includes(pathname)) {
				router.push(AUTH_ROUTES.SIGN_IN.path);
			}
		}
	}, [dispatch, pathname, router]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	return <>{children}</>;
};
