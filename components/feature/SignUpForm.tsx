"use client";

import { z } from "zod";
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Wrap,
	InputGroup,
	InputRightElement,
	FormErrorMessage,
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
import { supabaseClient } from "@/lib/supabase";

const EYE_ICON_SIZE = 20;

const SignUpSchema = z
	.object({
		email: z.string().email("Enter a valid email"),
		password: z
			.string()
			.min(
				PASSWORD_RESTRICTION.LENGTH.MIN,
				"Minimum password length must be at least 6 characters"
			)
			.max(
				PASSWORD_RESTRICTION.LENGTH.MAX,
				"Maximum password length must be at most 18 characters"
			)
			.regex(
				new RegExp(`[${PASSWORD_RESTRICTION.SYMBOLS}]`, "g"),
				`Should conaint at leat one character ${PASSWORD_RESTRICTION.SYMBOLS.join(
					", "
				)}`
			),
		confirm_password: z
			.string()
			.min(
				PASSWORD_RESTRICTION.LENGTH.MIN,
				"Minimum password length must be at least 6 characters"
			)
			.max(
				PASSWORD_RESTRICTION.LENGTH.MAX,
				"Maximum password length must be at most 18 characters"
			),
	})
	.superRefine(({ confirm_password, password }, ctx) => {
		if (confirm_password !== password) {
			ctx.addIssue({
				code: "custom",
				message: "Password mismatch",
				path: ["confirm_password"],
			});
		}
	});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

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

	const signUp: SubmitHandler<SignUpSchemaType> = async (data) => {
		startLoading();

		let signUpResponse = await supabaseClient.auth.signUp({
			email: data.email,
			password: data.password,
		});

		if (signUpResponse.error) {
			showToast({
				title: signUpResponse.error.name,
				description: signUpResponse.error.message,
				status: "error",
			});
		} else {
			const { error } = await supabaseClient.from("User").insert({
				email: signUpResponse.data.user?.email,
			});

			if (error) {
				showToast({
					title: "Internal server error",
					description:
						"Something went wrong while app was creating a user instance!",
					status: "error",
				});
			}
		}

		router.push(`/confirm_email/${signUpResponse.data.user?.email}`);
		stopLoading();
	};

	return (
		<form
			onSubmit={handleSubmit(signUp)}
			className="p-2 w-2xl max-w-2xl"
		>
			<Wrap>
				<FormControl isInvalid={!!errors.email}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						placeholder="Email"
						className="rounded-md p-1 w-full "
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
					<InputGroup>
						<Input
							type={isPasswordShown ? "text" : "password"}
							placeholder="Password"
							className="rounded-md p-1 w-full "
							aria-label="Password"
							aria-hidden={false}
							{...register("password")}
						/>
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
					</InputGroup>
					{errors.password && (
						<FormErrorMessage>{errors.password.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl isInvalid={!!errors.confirm_password}>
					<FormLabel>Confirm password</FormLabel>
					<InputGroup>
						<Input
							type={isPasswordShown ? "text" : "password"}
							placeholder="Confirm password"
							className="rounded-md p-1 w-full "
							aria-label="Confirm password"
							aria-hidden={false}
							{...register("confirm_password")}
						/>
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
					</InputGroup>
					{!errors.confirm_password ? (
						<div>
							<FormHelperText>
								Password length must be in the range{" "}
								{PASSWORD_RESTRICTION.LENGTH.MIN}-{PASSWORD_RESTRICTION.LENGTH.MAX}
							</FormHelperText>
							<FormHelperText>
								Password shoul contain one or more special characters{" "}
								{PASSWORD_RESTRICTION.SYMBOLS.join(", ")}
							</FormHelperText>
						</div>
					) : (
						<FormErrorMessage>{errors.confirm_password.message}</FormErrorMessage>
					)}
				</FormControl>
			</Wrap>
			<Button
				type="submit"
				className="rounded-md p-2 mt-8 bg-green-300 w-full transition hover:bg-green-200 active:bg-green-400"
				isLoading={isLoading}
			>
				{t("SIGN_UP")}
			</Button>
		</form>
	);
};