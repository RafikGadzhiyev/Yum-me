import { SignInForm } from "@/components/feature/SignInForm";
import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export default function SignInPage() {
	return (
		<div>
			<SignInForm />
			<span>
				Don&apos;t have an account?
				<Link
					href={AUTH_ROUTES.SIGN_UP.path}
					className="ml-2 mt-4 text-blue-500 hover:underline"
				>
					Sign up
				</Link>
			</span>
		</div>
	);
}