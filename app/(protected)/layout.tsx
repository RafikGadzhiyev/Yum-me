import { PropsWithChildren } from "react";
import { ScrollableLayout } from "@/components/layouts/ScrollableLayout";
import { SideBarNavigation } from "@/components/feature/SideBarNavigation";
import { FaList } from "react-icons/fa";

export default async function ProtectedPagesLayout({ children }: PropsWithChildren) {
	return (
		<div className="drawer">
			<input
				id="sidebar-navigation-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>

			<div className="drawer-side z-50">
				<label
					htmlFor="sidebar-navigation-drawer"
					className="drawer-overlay"
				/>

				<SideBarNavigation />
			</div>
			<div className="drawer-content">
				<ScrollableLayout>
					<div className="flex h-[100vh] max-h-[100vh] flex-1 flex-col p-2 md:pb-2">
						<div className="sticky top-0 z-40 mb-5 bg-base-100">
							<label
								htmlFor="sidebar-navigation-drawer"
								className="btn btn-ghost drawer-button"
							>
								<FaList />
							</label>
						</div>
						{children}
					</div>
				</ScrollableLayout>
			</div>
		</div>
	);
}
