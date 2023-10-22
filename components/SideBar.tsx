"use client";

import Link from "next/link";
import { APP_PAGE_LINK_LIST } from "@/consts";
import { Button } from "./UI/Button";
import { supabaseClient } from "@/utils/cms.util";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import { Loading } from "./UI/Loading";

export const SideBar = () => {
	const router = useRouter();
	const { isLoading, startLoading, stopLoading } = useLoading();

	const signOut = async () => {
		startLoading();
		await supabaseClient.auth.signOut();
		stopLoading();
		router.refresh();
	};

	return (
		<aside className="grid p-2 px-4 fixed bottom-0 w-full bg-green-300 md:static md:w-auto">
			<nav>
				<ul className="font-semibold text-lg flex items-center justify-between md:block">
					{APP_PAGE_LINK_LIST.map((link) => (
						<li
							key={link.key}
							className="hover:underline"
						>
							<Link href={link.path}>{link.label}</Link>
						</li>
					))}
				</ul>
			</nav>
			<Button
				dictionaryKey="SIGN_OUT"
				clickHandler={signOut}
			/>
			{isLoading && <Loading />}
		</aside>
	);
};
