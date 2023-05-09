import { z } from "zod";

import { userSchema } from "./User";

export const networkMemberSchema = z.object({
  user: userSchema.pick({ id: true }),
  status: z.enum(["INVITED", "JOINED"]),
  role: z.enum(["USER", "ADMIN", "OWNER"]),
});

export type NetworkMember = z.infer<typeof networkMemberSchema>;
