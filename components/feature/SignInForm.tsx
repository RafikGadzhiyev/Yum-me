"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Input,
	Button,
	Wrap,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";

import { useLoading } from "@/hooks/useLoading";
import { supabaseClient } from "@/lib/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";

const SignInSchema = z.object({
	email: z.string().email("Enter email"),
	password: z
		.string()
		.refine((password) => password.length > 0, "Fill the input"),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInSchemaType>({
		resolver: zodResolver(SignInSchema),
	});

	const { t } = useTranslation();
	const { show: showToast } = useShowToast();

	const { isLoading, startLoading, stopLoading } = useLoading();

	const [captcha, setCaptcha] = useState<string | null>(null);

	const router = useRouter();

	const signIn: SubmitHandler<SignInSchemaType> = async (data) => {
		if (!captcha) {
			showToast({
				title: "Captcha is required",
				description: "Please, complete captcha",
				status: "error",
			});
			return;
		}

		startLoading();
		const signInResponse = await supabaseClient.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (signInResponse.error) {
			showToast({
				title: signInResponse.error.name,
				description: signInResponse.error.message,
				status: "error",
			});
		}

		router.refresh();
		stopLoading();
	};

	return (
		<form onSubmit={handleSubmit(signIn)}>
			<Wrap
				spacingY={1}
				marginBottom={5}
			>
				<FormControl isInvalid={!!errors.email}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						placeholder="Email"
						className="rounded-md p-1 w-full"
						aria-label="Email"
						aria-hidden={false}
						{...register("email")}
					/>
					{errors.email && (
						<FormErrorMessage>{errors.email.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={!!errors.password}>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						placeholder="Password"
						className="rounded-md p-1 w-full"
						aria-label="Password"
						aria-hidden={false}
						{...register("password")}
					/>
					{errors.password && (
						<FormErrorMessage>{errors.password.message}</FormErrorMessage>
					)}
				</FormControl>
			</Wrap>
			<HCaptcha
				sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
				onVerify={(token: string) => setCaptcha(token)}
			/>
			<Button
				type="submit"
				className="rounded-md p-2 mt-2 bg-green-300 w-full transition hover:bg-green-200 active:bg-green-400"
				isLoading={isLoading}
			>
				{t("SIGN_IN")}
			</Button>
		</form>
	);
};
