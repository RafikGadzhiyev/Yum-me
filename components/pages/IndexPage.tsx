import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export const IndexPageWrapper = () => {
	return (
		<div className="flex min-h-[100vh] items-center justify-center bg-base-100">
			<div>
				<h1 className="text-center text-lg font-bold">
					Welcome to Yum-me. This is helpful web-application that helps with food
				</h1>

				<Link
					href={AUTH_ROUTES.SIGN_IN.path}
					className="btn btn-info mt-3"
				>
					Continue
				</Link>
			</div>
		</div>
	);
};
