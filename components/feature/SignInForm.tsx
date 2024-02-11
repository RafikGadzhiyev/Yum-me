"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useLoading } from "@/hooks/useLoading";
import { useShowToast } from "@/hooks/useShowToast";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { ROUTES } from "@/consts/routes.const";
import { SignInSchema, SignInSchemaType } from "@/consts/validations.const";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputWithControlProps } from "@/components/UI/FormInputWithControl";
import { signIn } from "@/api/auth";
import { Loading } from "@/components/UI/Loading";

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
				type: "error",
				position: "bottom-center",
			});
			return;
		}

		startLoading();

		const signInResult = await signIn(data.email, data.password);

		stopLoading();

		if ((signInResult as AuthLiteError).code) {
			showToast({
				title: (signInResult as AuthLiteError).code,
				description: (signInResult as AuthLiteError).message,
				type: "error",
				position: "bottom-center",
			});

			return;
		}

		showToast({
			title: "Success!",
			description: "Redirecting",
			type: "error",
			duration: 1000,
			position: "bottom-center",
		});

		router.push(ROUTES.HOME.path);

		stopLoading();
	};

	return (
		<form onSubmit={handleSubmit(signInHandler)}>
			<div className="mb-5 flex flex-col gap-2">
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
			</div>
			<HCaptcha
				sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
				onVerify={(token: string) => setCaptcha(token)}
			/>
			<button
				type="submit"
				className="btn btn-success mt-2 w-full"
			>
				{t("SIGN_IN")}
			</button>
			{isLoading && <Loading />}
		</form>
	);
};
