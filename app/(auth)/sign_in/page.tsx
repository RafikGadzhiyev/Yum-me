import { SignInForm } from "@/components/feature/SignInForm";
import Link from "next/link";
import { AUTH_ROUTES } from "@/consts/routes.const";

export default function SignInPage() {
	return (
		<div>
			<SignInForm />
			<Link href={AUTH_ROUTES.SIGN_UP.path}>Sign up</Link>
		</div>
	);
}