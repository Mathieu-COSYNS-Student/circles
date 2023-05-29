import { z } from "zod";

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Role = z.infer<typeof roleSchema>;
