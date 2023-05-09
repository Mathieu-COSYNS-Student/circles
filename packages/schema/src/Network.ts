import { z } from "zod";

import { networkMemberSchema } from "./NetworkMember";

export const networkSchema = z.object({
  id: z.string().min(24).max(24),
  name: z.string().min(2, "name must contain at least 2 character"),
  pictureUrl: z.string().url().or(z.null()),
  members: z.array(networkMemberSchema).optional(),
});

export const createNetworkSchema = networkSchema.pick({
  name: true,
});

export type Network = z.infer<typeof networkSchema>;
export type CreateNetworkValues = z.infer<typeof createNetworkSchema>;
