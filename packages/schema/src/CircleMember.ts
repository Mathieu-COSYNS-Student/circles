import { z } from "zod";

import { userSchema } from "./User";

export const circleMemberSchema = z.object({
  user: userSchema,
  status: z.enum(["INVITED", "JOINED"]),
  role: z.enum(["USER", "ADMIN"]),
});

export type CircleMember = z.infer<typeof circleMemberSchema>;
