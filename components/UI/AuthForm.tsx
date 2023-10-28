"use client";

import { useState, useRef, FormEvent, PropsWithChildren, FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { changeStringTransform } from "@/utils/string.util";
import { handlerError } from "@/utils/handlers.util";
import { supabaseClient } from "@/utils/cms.util";
import { useToast } from "@chakra-ui/react";
import { useLoading } from "@/hooks/useLoading";
import { Loading } from "./Loading";

interface IAuthForm extends PropsWithChildren {
	formInputs: IInputConfig[];
	formType: AuthType;
}

export const AuthForm: FC<IAuthForm> = ({ formInputs, formType }) => {
	const { t } = useTranslation();
	const { isLoading, startLoading, stopLoading } = useLoading();

	const toast = useToast();

	const router = useRouter();

	const [captchaToken, setCaptchaToken] = useState<string | undefined>(
		undefined
	);

	const authHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formRef.current) {
			return toast({
				title: "Internal server error",
				description: "Cannot find form!",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}

		const signUpCredentials: Record<string, string> = {};

		if (!captchaToken) {
			return toast({
				title: "Captcha validation error",
				description: "Complete captcha",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}

		for (let inputConfig of formInputs) {
			const formInput: HTMLInputElement = formRef.current.elements.namedItem(
				inputConfig.name
			) as HTMLInputElement;

			if (!formInput.value.length) {
				return toast({
					title: "Invalid data",
					description: "Please, fill fields",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
			signUpCredentials[inputConfig.name] = formInput.value;
		}

		const { email, password } = signUpCredentials;

		let auth;

		startLoading();

		switch (formType) {
			case "sign_in":
				auth = await supabaseClient.auth.signInWithPassword({
					email,
					password,
					options: {
						captchaToken,
					},
				});

				if (auth.error) {
					toast({
						title: auth.error.name,
						description: auth.error.message,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Success",
						description: "Redirecting to home page",
						status: "success",
						duration: 5000,
						isClosable: true,
					});
				}

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
					stopLoading();

					toast({
						title: "Internal server error",
						description:
							"Something went wrong while app was creating a user instance!",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}

				router.push("/confirm_email");
				break;
			default:
				auth = null;
		}

		stopLoading();
	};

	const formRef = useRef<HTMLFormElement>();
	return (
		<>
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
			{isLoading && <Loading />}
		</>
	);
};
