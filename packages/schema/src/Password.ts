import { z } from "zod";

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    "Password must be at least 6 characters long and contain at " +
      "least one uppercase letter, one lowercase letter, and one digit",
  );

export type Password = z.infer<typeof passwordSchema>;
