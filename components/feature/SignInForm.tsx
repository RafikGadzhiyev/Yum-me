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
import { useShowToast } from "@/hooks/useShowToast";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { signIn } from "@/api/auth";

const SignInSchema = z.object({
	email: z.string().email("Enter email"),
	password: z.string().refine((password) => password.length > 0, "Fill the input"),
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

	const signInHandler: SubmitHandler<SignInSchemaType> = async (data) => {
		if (!captcha) {
			showToast({
				title: "Captcha is required",
				description: "Please, complete captcha",
				status: "error",
			});
			return;
		}

		startLoading();
		await signIn(data.email, data.password);

		router.refresh();
		stopLoading();
	};

	return (
		<form onSubmit={handleSubmit(signInHandler)}>
			<Wrap
				spacingY={1}
				marginBottom={5}
			>
				<FormControl isInvalid={!!errors.email}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						placeholder="Email"
						className="w-full rounded-md p-1"
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
						className="w-full rounded-md p-1"
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
				className="mt-2 w-full rounded-md bg-green-300 p-2 transition hover:bg-green-200 active:bg-green-400"
				isLoading={isLoading}
			>
				{t("SIGN_IN")}
			</Button>
		</form>
	);
};