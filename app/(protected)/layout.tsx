import { SideBar } from "@/components/SideBar";
import { ScrollableLayout } from "@/components/layouts/ScrollableLayout";
import { PropsWithChildren } from "react";
export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
	return (
		<div className="grid grid-rows-[auto_1fr]  md:flex ">
			<SideBar />
			<ScrollableLayout>
				<div className="p-2 bg-slate-100 flex-1 md:pb-2 h-fit min-h-[100vh] relative">
					{children}
				</div>
			</ScrollableLayout>
		</div>
	);
}
