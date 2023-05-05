import { z } from "zod";

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    "Password must be at least 6 characters long and contain at " +
      "least one uppercase letter, one lowercase letter, and one digit",
  );

export type Password = z.infer<typeof passwordSchema>;

const _confirmPasswordFormSchema = z.object({
  newPassword: passwordSchema,
  confirmNewPassword: passwordSchema,
});

const _resetPasswordFormSchema = _confirmPasswordFormSchema.merge(
  z.object({
    signOutOfOtherSessions: z.boolean(),
  }),
);

const _updatePasswordFormSchema = _resetPasswordFormSchema.merge(
  z.object({
    currentPassword: passwordSchema,
  }),
);

export const addPasswordMismatch = <
  T extends typeof _confirmPasswordFormSchema,
>(
  formSchema: T,
) => {
  return formSchema.refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    },
  ) as z.ZodEffects<T>;
};

export const resetPasswordFormSchema = addPasswordMismatch(
  _resetPasswordFormSchema,
);
export const updatePasswordFormSchema = addPasswordMismatch<
  typeof _updatePasswordFormSchema
>(_updatePasswordFormSchema);

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
export type UpdatePasswordFormSchema = z.infer<typeof updatePasswordFormSchema>;
