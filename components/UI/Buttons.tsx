"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/useLoading";
import { supabaseClient } from "@/utils/cms.util";
import { FC, useCallback, useEffect } from "react";
import { FaDoorOpen } from "react-icons/fa";
interface IButtonProps extends React.PropsWithChildren {
	dictionaryKey: string;
}

export const SignOutButton: FC<IButtonProps> = ({ dictionaryKey }) => {
	const router = useRouter();
	const { t } = useTranslation();
	const { isLoading, startLoading, stopLoading } = useLoading();

	const signOut = useCallback(async () => {
		startLoading();
		await supabaseClient.auth.signOut();
		stopLoading();
		router.refresh();
	}, []);

	useEffect(() => {}, []);

	return (
		<button
			className="mt-auto font-bold text-lg rounded-md p-2 bg-red-400 text-white flex items-center gap-3 justify-center transition hover:bg-red-500 active:bg-red-600"
			onClick={signOut}
		>
			<FaDoorOpen />
			{t(dictionaryKey)}
		</button>
	);
};
