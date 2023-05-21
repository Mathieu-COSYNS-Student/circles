import { z } from "zod";

import { addPasswordMismatch, passwordSchema } from "./Password";

export const userSchema = z.object({
  id: z.string(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const signUpSchema = addPasswordMismatch(
  z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  }),
);

export const signUpEmailVerifySchema = z.object({
  code: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignUpEmailVerifyValues = z.infer<typeof signUpEmailVerifySchema>;
