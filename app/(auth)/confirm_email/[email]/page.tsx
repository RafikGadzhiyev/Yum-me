"use client"; // TODO: REMOVE THAT SHIT

import { ROUTES } from "@/consts/routes.const";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function EmailConfirmationPage({
	params,
}: {
	params: { email: string };
}) {
	const resend = async () => {
		await supabaseClient.auth.resend({
			email: decodeURIComponent(params.email),
			type: "signup",
		});
	};

	return (
		<div>
			<h1 className="font-bold text-xl">
				We have sent to your email ({decodeURIComponent(params.email)}) an email
				verification letter.
			</h1>
			<h2 className="font-bold text-lg">
				Please, check it out and confirm yourself. If you do not confirm your email,
				You will not able to log in to our application
			</h2>

			<Button onClick={resend}>Resend verification email</Button>

			<Link href={ROUTES.HOME.path}>Continue (If you confirmed your email)</Link>
		</div>
	);
}