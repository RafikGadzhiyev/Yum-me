"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/useLoading";
import { supabaseClient } from "@/lib/supabase";
import { FC, useCallback, PropsWithChildren } from "react";
import { FaDoorOpen } from "react-icons/fa";

interface IButtonProps extends PropsWithChildren {
	dictionaryKey: string;
}

export const SignOutButton: FC<IButtonProps> = ({ dictionaryKey }) => {
	const router = useRouter();
	const { t } = useTranslation();
	const { startLoading, stopLoading } = useLoading();

	const signOut = useCallback(async () => {
		startLoading();
		await supabaseClient.auth.signOut();
		stopLoading();
		router.refresh();
	}, [router, startLoading, stopLoading]);

	return (
		<button
			className="mt-auto flex items-center justify-center gap-3 rounded-md bg-red-400 p-2 text-lg font-bold text-white transition hover:bg-red-500 active:bg-red-600"
			onClick={signOut}
		>
			<FaDoorOpen />
			{t(dictionaryKey)}
		</button>
	);
};