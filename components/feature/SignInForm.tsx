"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Wrap } from "@chakra-ui/react";

import { useLoading } from "@/hooks/useLoading";
import { useShowToast } from "@/hooks/useShowToast";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { ROUTES } from "@/consts/routes.const";
import { SignInSchema, SignInSchemaType } from "@/consts/validations.const";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppwriteException } from "appwrite";
import { FormInputWithControlProps } from "@/components/UI/FormInputWithControl";
import { signIn } from "@/api/NewAuth";

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

		signIn(data.email, data.password)
			.then(() => {
				showToast({
					title: "Success!",
					description: "Redirecting",
					status: "success",
					duration: 1000,
				});

				router.push(ROUTES.HOME.path);
			})
			.catch((err: AppwriteException) => {
				console.log(err);

				showToast({
					title: err.name,
					description: err.message,
					status: "error",
				});
			})
			.finally(stopLoading);
	};

	return (
		<form onSubmit={handleSubmit(signInHandler)}>
			<Wrap
				spacingY={1}
				marginBottom={5}
			>
				<FormInputWithControlProps
					isInvalid={!!errors.email}
					label="Email"
					registerProps={register("email")}
					error={errors.email}
					type="email"
					placeholder="Email"
					aria-hidden={false}
				/>

				<FormInputWithControlProps
					isInvalid={!!errors.password}
					label="Password"
					registerProps={register("password")}
					error={errors.password}
					type="password"
					placeholder="Password"
					aria-hidden={false}
				/>
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
