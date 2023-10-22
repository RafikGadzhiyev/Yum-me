"use client";
import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AUTH_BY_TYPE } from "@/configs/auth.config";
import { supabase } from "@/utils/cms.util";
import HCaptcha from "@hcaptcha/react-hcaptcha";
// import { bindElementToRef } from "@/utils/callbackRefs.util";

export const IndexPageWrapper = () => {
	const { t, i18n } = useTranslation();

	const [captchaToken, setCaptchaToken] = useState<string | undefined>(
		undefined,
	);
	const [authType, setAuthType] = useState<"sign_up" | "sign_in">("sign_in");

	const formRef = useRef<HTMLFormElement>();

	const signUpHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formRef.current) return;

		const signUpCredentials: Record<string, string> = {};

		for (let inputConfig of AUTH_BY_TYPE[authType]) {
			const formInput: HTMLInputElement = formRef.current.elements.namedItem(
				inputConfig.name,
			) as HTMLInputElement;

			if (!formInput.value.length) return;
			signUpCredentials[inputConfig.name] = formInput.value;
		}

		// ? Connect types with Supabase types
		// supabase.auth
		// 	.signUp({
		// 		email: signUpCredentials.email,
		// 		password: signUpCredentials.password,
		// 		options: {
		// 			captchaToken: captchaToken,
		// 		},
		// 	})
		// 	.then((response) => {
		// 		console.log(response.data);
		// 	});

		// supabase.auth
		// 	.signInWithPassword({
		// 		email: signUpCredentials.email,
		// 		password: signUpCredentials.password,
		// 		options: {
		// 			captchaToken,
		// 		},
		// 	})
		// 	.then((response) => {
		// 		console.log(response.data);
		// 	});
	};

	return (
		<div className="bg-slate-300 min-h-[100vh] flex items-center justify-center">
			<div>
				<h1 className="font-bold text-2xl mb-2">
					{t("INDEX_PAGE.AUTH_FORM_TITLE")}
				</h1>
				<div className="bg-slate-500 rounded-md w-fit mx-auto">
					<ul className="grid grid-cols-2 items-center justify-around rounded-t-md bg-slate-400 w-full text-white">
						<li>
							<button
								onClick={() => setAuthType("sign_up")}
								className={`p-2 font-bold w-full rounded-t-md ${
									authType === "sign_up" ? "text-xl bg-slate-500" : ""
								}`}
							>
								Sign up
							</button>
						</li>
						<li>
							<button
								onClick={() => setAuthType("sign_in")}
								className={`p-2 font-bold w-full rounded-t-md ${
									authType === "sign_in" ? "text-xl bg-slate-500" : ""
								}`}
							>
								Sign in
							</button>
						</li>
					</ul>
					<form
						ref={(element) => {
							if (!element) return;
							formRef.current = element;
						}}
						onSubmit={signUpHandler}
					>
						<div className="rounded-md flex flex-col  items-start  gap-3 w-fit mx-auto  p-2">
							{AUTH_BY_TYPE[authType].map((inputConfig) => (
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
								{authType}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
