import { SignUpForm } from "@/components/feature/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
	return (
		<div>
			<SignUpForm />
			<Link href="/sign_in">Sign in</Link>
		</div>
	);
}
