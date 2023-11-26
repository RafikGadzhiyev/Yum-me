import { Suspense } from "react";
import type { Metadata } from "next";
import { Provider } from "@/components/Provider";
import "./globals.css";

export const metadata: Metadata = {
	title: "YumMe",
	description: "Welcome to AI based food suggestion app!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Suspense fallback="Loaging data!">
					<Provider>{children}</Provider>
				</Suspense>
			</body>
		</html>
	);
}
