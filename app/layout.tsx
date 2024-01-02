import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Provider } from "@/components/Provider";
import "./globals.css";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";

export const metadata: Metadata = {
	title: "YumMe",
	description: "Welcome to AI based food suggestion app!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<SpeedInsights />
				<ProtectedLayout>
					<Suspense fallback="Loaging data!">
						<Provider>{children}</Provider>
					</Suspense>
				</ProtectedLayout>
			</body>
		</html>
	);
}