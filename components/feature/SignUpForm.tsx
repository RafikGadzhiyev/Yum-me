"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useShowToast } from "@/hooks/useShowToast";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

import { PASSWORD_RESTRICTION } from "@/consts/auth.const";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/consts/routes.const";
import { SignUpSchema, SignUpSchemaType } from "@/consts/validations.const";
import { FormInputWithControlProps } from "@/components/UI/FormInputWithControl";
import { signUp } from "@/api/auth";
import { Loading } from "@/components/UI/Loading";

const EYE_ICON_SIZE = 20;

export const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });
	const { isLoading, sendRequest } = useFetch();
	const { t } = useTranslation();
	const { show: showToast } = useShowToast();
	const router = useRouter();

	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const signUpHandler: SubmitHandler<SignUpSchemaType> = async (data) => {
		signUp(data.email, data.password)
			.then(async () => {
				await sendRequest("POST", "/api/user", data, {
					"Content-Type": "application/json",
				});

				showToast({
					title: "Success",
					type: "success",
					description: "Redirecting to home page",
					duration: 500,
					position: "bottom-center",
				});

				router.push(ROUTES.HOME.path);
			})
			.catch((err) => {
				showToast({
					title: err.code,
					type: "error",
					description: err.message,
					position: "bottom-center",
				});
			});
	};

	return (
		<form
			onSubmit={handleSubmit(signUpHandler)}
			className="w-2xl max-w-2xl p-2"
		>
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
					placeholder="Password"
					registerProps={register("password")}
					error={errors.password}
					type={isPasswordShown ? "text" : "password"}
					aria-hidden={false}
					RightComponent={() => (
						<button
							className="btn btn-ghost"
							onClick={() =>
								setIsPasswordShown((prevIsPasswordShown) => !prevIsPasswordShown)
							}
							tabIndex={-1}
						>
							{isPasswordShown ? (
								<FaEyeSlash size={EYE_ICON_SIZE} />
							) : (
								<FaEye size={EYE_ICON_SIZE} />
							)}
						</button>
					)}
				/>

				<FormInputWithControlProps
					isInvalid={!!errors.confirm_password}
					label="Confirm password"
					placeholder="Confirm password"
					registerProps={register("confirm_password")}
					error={errors.confirm_password}
					type={isPasswordShown ? "text" : "password"}
					aria-hidden={false}
					RightComponent={() => (
						<button
							className="btn btn-ghost"
							onClick={() =>
								setIsPasswordShown((prevIsPasswordShown) => !prevIsPasswordShown)
							}
							tabIndex={-1}
						>
							{isPasswordShown ? (
								<FaEyeSlash size={EYE_ICON_SIZE} />
							) : (
								<FaEye size={EYE_ICON_SIZE} />
							)}
						</button>
					)}
				/>
				<div className="flex flex-col">
					<span className="text-sm text-neutral-content">
						Password length must be in the range {PASSWORD_RESTRICTION.LENGTH.MIN}-
						{PASSWORD_RESTRICTION.LENGTH.MAX}
					</span>
					<span className="text-sm text-neutral-content">
						Password should contain one or more special characters{" "}
						{PASSWORD_RESTRICTION.SYMBOLS.join(", ")}
					</span>
				</div>
			</div>
			<button
				type="submit"
				className="btn btn-success mt-2 w-full"
			>
				{t("SIGN_UP")}
			</button>

			{isLoading && <Loading />}
		</form>
	);
};
