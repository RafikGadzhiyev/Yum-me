import { SignInForm } from "@/components/feature/SignInForm";
import Link from "next/link";

export default function SignInPage() {
	return (
		<div>
			<SignInForm />
			<Link href="/sign_up">Sign up</Link>
		</div>
	);
}
