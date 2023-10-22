import { APP_PAGE_LINK_LIST } from "@/consts";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex h-[100vh]">
			<nav className="p-2 px-4 fixed bottom-0 w-full bg-green-300 md:static md:w-auto">
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
			<div className="p-2 pb-5 bg-slate-100 flex-1 max-h-[100vh] overflow-y-scroll md:pb-2">
				{children}
			</div>
		</div>
	);
}
