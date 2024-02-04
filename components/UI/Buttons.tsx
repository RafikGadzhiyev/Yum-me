"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/useLoading";
import { FC, useCallback, PropsWithChildren } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { signOut } from "@/api/auth";
import { AUTH_ROUTES } from "@/consts/routes.const";

interface IButtonProps extends PropsWithChildren {
	dictionaryKey: string;
}

export const SignOutButton: FC<IButtonProps> = ({ dictionaryKey }) => {
	const router = useRouter();
	const { t } = useTranslation();
	const { startLoading, stopLoading } = useLoading();

	const signOutHandler = useCallback(async () => {
		startLoading();
		await signOut();
		stopLoading();
		router.push(AUTH_ROUTES.SIGN_IN.path);
	}, [router, startLoading, stopLoading]);

	return (
		<button
			className="btn btn-error"
			onClick={signOutHandler}
		>
			<FaDoorOpen />
			{t(dictionaryKey)}
		</button>
	);
};

/**
 *
 * <button
 * 			className="mt-auto flex items-center justify-center gap-3 rounded-md bg-red-400 p-2 text-lg font-bold text-white transition hover:bg-red-500 active:bg-red-600"
 * 			onClick={signOutHandler}
 * 		>
 * 			<FaDoorOpen />
 * 			{t(dictionaryKey)}
 * 		</button>
 *
 */
