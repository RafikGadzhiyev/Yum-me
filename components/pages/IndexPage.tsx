import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export const IndexPageWrapper = () => {
	return (
		<div className="flex min-h-[100vh] items-center justify-center bg-slate-300">
			<div>
				<h1>
					Welcome to Yum-me. This is helpful web-application that helps with food
				</h1>

				<Link href={AUTH_ROUTES.SIGN_IN.path}>Continue</Link>
			</div>
		</div>
	);
};