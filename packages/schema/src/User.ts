import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(24).max(24),
});

export type User = z.infer<typeof userSchema>;
