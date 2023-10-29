import { SideBar } from "@/components/SideBar";
import { PropsWithChildren } from "react";
export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
	return (
		<div className="grid grid-rows-[auto_1fr]  md:flex h-[100vh]">
			<SideBar />
			<div className="p-2 bg-slate-100 flex-1 max-h-[100vh] overflow-y-scroll md:pb-2">
				{children}
			</div>
		</div>
	);
}
