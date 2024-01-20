import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Provider } from "@/components/Provider";
import "./globals.css";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import { headers } from "next/headers";

export const metadata: Metadata = {
	title: "YumMe",
	description: "Welcome to AI based food suggestion app!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const headerList = headers();
	const theme = headerList.get("theme") || "retro";

	return (
		<html
			lang="en"
			data-theme={theme}
		>
			<body>
				<SpeedInsights />
				<Provider>
					<ProtectedLayout>
						<Suspense fallback="Loaging data!">{children}</Suspense>
					</ProtectedLayout>
				</Provider>
			</body>
		</html>
	);
}