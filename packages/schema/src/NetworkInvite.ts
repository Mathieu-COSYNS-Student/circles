import { z } from "zod";

import { networkSchema } from "./Network";

export const networkInviteSchema = z.object({
  id: z.string().min(24).max(24),
  networkId: networkSchema.shape.id,
  code: z.coerce
    .string()
    .max(8)
    .transform((code) => code.padStart(8, "0")),
  expireAt: z
    .string()
    .datetime()
    .or(z.date().transform((date) => date.toISOString())),
  used: z.boolean(),
});

export const createNetworkInviteSchema = networkInviteSchema.pick({
  networkId: true,
});

export type NetworkInvite = z.infer<typeof networkInviteSchema>;
export type CreateNetworkInviteValues = z.infer<
  typeof createNetworkInviteSchema
>;
