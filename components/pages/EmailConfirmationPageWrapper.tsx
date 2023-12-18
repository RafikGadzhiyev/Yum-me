"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

import { ROUTES } from "@/consts/routes.const";

import { supabaseClient } from "@/lib/supabase";

export const EmailConfirmationPageWrapper = () => {
	const { email } = useParams();

	const resend = async () => {
		await supabaseClient.auth.resend({
			email: decodeURIComponent(email as string),
			type: "signup",
		});
	};

	return (
		<div className="text-center">
			<h1 className="font-bold text-2xl mb-6">
				We have sent to your email ({decodeURIComponent(email as string)}) an email
				verification letter.
			</h1>
			<b className="font-bold">
				Please, check it out and confirm yourself. If you do not confirm your email,
				You will not able to log in to our application
			</b>

			<div className="flex items-center my-4 gap-5 justify-center">
				<Button
					onClick={resend}
					variant="outline"
				>
					Resend verification email
				</Button>

				<div className="grid text-left">
					<Link href={ROUTES.HOME.path}>Continue</Link>
					<span className="text-sm text-gray-500 -translate-y-1/4">
						If you confirmed email
					</span>
				</div>
			</div>
		</div>
	);
};