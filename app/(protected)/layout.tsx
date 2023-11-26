import { PropsWithChildren } from "react";
import { SideBar } from "@/components/SideBar";
import { ScrollableLayout } from "@/components/layouts/ScrollableLayout";

export default async function ProtectedPagesLayout({
	children,
}: PropsWithChildren) {
	return (
		<div className="grid grid-rows-[auto_1fr]  md:flex ">
			<SideBar />
			<ScrollableLayout>
				<div className="p-2 bg-slate-100 flex-1 md:pb-2 h-fit min-h-[100dvh] relative">
					{children}
				</div>
			</ScrollableLayout>
		</div>
	);
}
