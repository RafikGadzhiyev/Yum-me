import { z } from "zod";
import { PASSWORD_RESTRICTION } from "@/consts/auth.const";

export const SignInSchema = z.object({
	email: z.string().email("Enter a valid email address"),
	password: z.string().refine((password: string) => password.length > 0),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
	.object({
		email: z.string().email("Enter a valid email"),
		password: z
			.string()
			.min(
				PASSWORD_RESTRICTION.LENGTH.MIN,
				"Minimum password length must be at least 6 characters",
			)
			.max(
				PASSWORD_RESTRICTION.LENGTH.MAX,
				"Maximum password length must be at most 18 characters",
			)
			.regex(
				new RegExp(`[${PASSWORD_RESTRICTION.SYMBOLS}]`, "g"),
				`Should conaint at leat one character ${PASSWORD_RESTRICTION.SYMBOLS.join(
					", ",
				)}`,
			),
		confirm_password: z
			.string()
			.min(
				PASSWORD_RESTRICTION.LENGTH.MIN,
				"Minimum password length must be at least 6 characters",
			)
			.max(
				PASSWORD_RESTRICTION.LENGTH.MAX,
				"Maximum password length must be at most 18 characters",
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

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
