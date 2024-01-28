"use client";

import {
	FormControl,
	Button,
	Wrap,
	InputRightElement,
	FormHelperText,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/useLoading";
import { useShowToast } from "@/hooks/useShowToast";
import { useRouter } from "next/navigation";

import { PASSWORD_RESTRICTION } from "@/consts/auth.const";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signUp } from "@/api/auth";
import { ROUTES } from "@/consts/routes.const";
import { SignUpSchema, SignUpSchemaType } from "@/consts/validations.const";
import { FormInputWithControlProps } from "@/components/UI/FormInputWithControl";
import { signUp } from "@/api/NewAuth";

const EYE_ICON_SIZE = 20;

export const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });
	const { t } = useTranslation();
	const { show: showToast } = useShowToast();
	const { isLoading, startLoading, stopLoading } = useLoading();
	const router = useRouter();

	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const signUpHandler: SubmitHandler<SignUpSchemaType> = async (data) => {
		startLoading();

		signUp(data.email, data.password)
			.then(async (user) => {
				console.log(user);

				await fetch(process.env.NEXT_PUBLIC_BASE_URL! + "/api/user", {
					method: "POST",
					body: JSON.stringify(data),
				});

				showToast({
					title: "Success",
					status: "success",
					description: "Redirecting to home page",
					duration: 500,
				});

				router.push(ROUTES.HOME.path);
			})
			.catch((err) => {
				showToast({
					title: err.code,
					status: "error",
					description: err.message,
				});
			})
			.finally(stopLoading);
	};

	return (
		<form
			onSubmit={handleSubmit(signUpHandler)}
			className="w-2xl max-w-2xl p-2"
		>
			<Wrap>
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
				>
					<InputRightElement>
						<Button
							padding={0}
							onClick={() =>
								setIsPasswordShown((prevIsPasswordShowm) => !prevIsPasswordShowm)
							}
							tabIndex={-1}
						>
							{isPasswordShown ? (
								<FaEyeSlash size={EYE_ICON_SIZE} />
							) : (
								<FaEye size={EYE_ICON_SIZE} />
							)}
						</Button>
					</InputRightElement>
				</FormInputWithControlProps>

				<FormInputWithControlProps
					isInvalid={!!errors.confirm_password}
					label="Confirm password"
					placeholder="Confirm password"
					registerProps={register("confirm_password")}
					error={errors.confirm_password}
					type={isPasswordShown ? "text" : "password"}
					aria-hidden={false}
				>
					<InputRightElement>
						<Button
							padding={0}
							onClick={() =>
								setIsPasswordShown((prevIsPasswordShowm) => !prevIsPasswordShowm)
							}
							tabIndex={-1}
						>
							{isPasswordShown ? (
								<FaEyeSlash size={EYE_ICON_SIZE} />
							) : (
								<FaEye size={EYE_ICON_SIZE} />
							)}
						</Button>
					</InputRightElement>
				</FormInputWithControlProps>
				<FormControl>
					<div>
						<FormHelperText>
							Password length must be in the range {PASSWORD_RESTRICTION.LENGTH.MIN}-
							{PASSWORD_RESTRICTION.LENGTH.MAX}
						</FormHelperText>
						<FormHelperText>
							Password shoul contain one or more special characters{" "}
							{PASSWORD_RESTRICTION.SYMBOLS.join(", ")}
						</FormHelperText>
					</div>
				</FormControl>
			</Wrap>
			<Button
				type="submit"
				className="mt-8 w-full rounded-md bg-green-300 p-2 transition hover:bg-green-200 active:bg-green-400"
				isLoading={isLoading}
			>
				{t("SIGN_UP")}
			</Button>
		</form>
	);
};
