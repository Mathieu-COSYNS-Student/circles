import { z } from "zod";

import { userSchema } from "./User";

export const chatMemberSchema = z.object({
  user: userSchema.pick({ id: true }),
  status: z.enum(["INVITED", "JOINED"]),
  role: z.enum(["USER", "ADMIN"]),
});

export type ChatMember = z.infer<typeof chatMemberSchema>;
