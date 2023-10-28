"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthForm } from "../UI/AuthForm";
import { AUTH_BY_TYPE } from "@/configs/auth.config";

export const IndexPageWrapper = () => {
	const { t } = useTranslation();

	const [authType, setAuthType] = useState<AuthType>("sign_in");

	useEffect(() => {}, []);

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
					<AuthForm
						formInputs={AUTH_BY_TYPE[authType]}
						formType={authType}
					/>
				</div>
			</div>
		</div>
	);
};
