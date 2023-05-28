import { z } from "zod";

import { networkMemberSchema } from "./NetworkMember";

export const networkSchema = z.object({
  id: z.string().min(24).max(24),
  name: z.string().min(2, "name must contain at least 2 character"),
  pictureUrl: z.string().url().or(z.null()),
  owner: z.string(),
  members: z.array(networkMemberSchema).optional(),
});

export const getAllNetworkSchema = z
  .object({
    filter: z
      .object({
        canInviteMembers: z.boolean().optional().default(false),
        canCreateCircles: z.boolean().optional().default(false),
      })
      .optional()
      .default({}),
  })
  .optional()
  .default({});

export const createNetworkSchema = networkSchema.pick({
  name: true,
});

export type Network = z.infer<typeof networkSchema>;
export type GetAllNetworkSchema = z.infer<typeof getAllNetworkSchema>;
export type CreateNetworkValues = z.infer<typeof createNetworkSchema>;
