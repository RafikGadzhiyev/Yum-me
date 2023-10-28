"use client";

import { useState, useRef, FormEvent, PropsWithChildren, FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { changeStringTransform } from "@/utils/string.util";
import { handlerError, hanldeData } from "@/utils/handlers.util";
import { supabaseClient } from "@/utils/cms.util";

interface IAuthForm extends PropsWithChildren {
	formInputs: IInputConfig[];
	formType: AuthType;
}

export const AuthForm: FC<IAuthForm> = ({ formInputs, formType }) => {
	const { t } = useTranslation();
	const router = useRouter();

	const [captchaToken, setCaptchaToken] = useState<string | undefined>(
		undefined
	);

	const authHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formRef.current) {
			return handlerError("Internal server error", "Cannot find form!", 503);
		}

		const signUpCredentials: Record<string, string> = {};

		for (let inputConfig of formInputs) {
			const formInput: HTMLInputElement = formRef.current.elements.namedItem(
				inputConfig.name
			) as HTMLInputElement;

			if (!formInput.value.length) {
				return handlerError("Invalid data", "Please, fill fields", 400);
			}
			signUpCredentials[inputConfig.name] = formInput.value;
		}

		const { email, password } = signUpCredentials;

		let auth;

		switch (formType) {
			case "sign_in":
				auth = await supabaseClient.auth.signInWithPassword({
					email,
					password,
					options: {
						captchaToken,
					},
				});

				router.refresh();
				break;
			case "sign_up":
				auth = await supabaseClient.auth.signUp({
					email,
					password,
					options: {
						captchaToken,
					},
				});

				const { error } = await supabaseClient.from("User").insert({
					email: auth.data.user?.email,
				});

				if (error) {
					return handlerError(
						"Internal server error",
						"Something went wrong while app was creating a user instance!",
						500
					);
				}

				router.push("/confirm_email");
				break;
			default:
				auth = null;
		}

		if (!auth) {
			return handlerError("Bad request", "Something went wrong!", 503);
		}

		if (auth && auth.error) {
			return handlerError(auth.error.name, auth.error.message, 400);
		}
	};

	const formRef = useRef<HTMLFormElement>();
	return (
		<form
			ref={(element) => {
				if (!element) return;
				formRef.current = element;
			}}
			onSubmit={authHandler}
		>
			<div className="rounded-md flex flex-col  items-start  gap-3 w-fit mx-auto  p-2">
				{formInputs.map((inputConfig) => (
					<input
						key={inputConfig.name}
						type={inputConfig.type}
						name={inputConfig.name}
						placeholder={inputConfig.placeholder}
						aria-label={inputConfig.label}
						aria-hidden={false}
						className="rounded-md p-1 w-full"
					/>
				))}
				<HCaptcha
					sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY as string}
					onVerify={(token: string) => setCaptchaToken(token)}
				/>
				<button className="rounded-md p-2 bg-green-300 w-full transition hover:bg-green-200 active:bg-green-400">
					{t(changeStringTransform(formType, "uppercase"))}
				</button>
			</div>
		</form>
	);
};
