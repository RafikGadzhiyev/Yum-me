import { SignUpForm } from "@/components/feature/SignUpForm";
import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export default function SignUpPage() {
	return (
		<div>
			<SignUpForm />
			<span>
				Already have account?
				<Link
					href={AUTH_ROUTES.SIGN_IN.path}
					className="ml-2 mt-4 text-blue-500 hover:underline"
				>
					Sign in
				</Link>
			</span>
		</div>
	);
}