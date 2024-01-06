"use client";

import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AUTH_ROUTES, ROUTES } from "@/consts/routes.const";
import { getSession } from "@/api/auth";
import { useDispatch } from "react-redux";
import { readUser } from "@/redux/slices/user.slice";
import { Query, UserActiveSession } from "@/lib/appwrite";
import { getUsers } from "@/api/user";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

	const getUser = useCallback(async () => {
		const authRoutesPathList = Object.values(AUTH_ROUTES).map(
			(authRoute) => authRoute.path,
		);

		try {
			const user = await getSession();

			dispatch(readUser(user));

			if (user && authRoutesPathList.includes(pathname)) {
				await getUserHealth(user);

				router.push(ROUTES.HOME.path);
			}
		} catch (err) {
			if (!authRoutesPathList.includes(pathname)) {
				router.push(AUTH_ROUTES.SIGN_IN.path);
			}
		}
	}, [pathname, router]);

	const getUserHealth = async (user: UserActiveSession) => {
		const users = await getUsers([Query.equal("email", user.email)]);
		const userHealthData = users[0];

		dispatch(readUserHealthData(userHealthData));

		return userHealthData;
	};

	useEffect(() => {
		getUser();
	}, [getUser]);

	return <>{children}</>;
};