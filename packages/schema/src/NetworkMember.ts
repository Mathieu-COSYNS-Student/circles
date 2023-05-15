import { z } from "zod";

import { userSchema } from "./User";

export const networkMemberSchema = z.object({
  userId: userSchema.shape.id,
  networkId: z.string(),
  status: z.enum(["INVITED", "JOINED"]),
  role: z.enum(["USER", "ADMIN", "OWNER"]),
});

export type NetworkMember = z.infer<typeof networkMemberSchema>;
