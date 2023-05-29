import { z } from "zod";

import { roleSchema } from "./Role";

export const networkSchema = z.object({
  id: z.string().min(24).max(24),
  name: z.string().min(2, "name must contain at least 2 character"),
  pictureUrl: z.string().url().or(z.null()),
  owner: z.string(),
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

export const getCirclesInputSchema = z.object({
  networkId: networkSchema.shape.id,
});

export const getMembersInputSchema = getCirclesInputSchema;

export const getMemberOutputSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profileImageUrl: z.string().or(z.null()).optional(),
  roles: z.array(
    roleSchema.pick({
      id: true,
      name: true,
    }),
  ),
});

export const getMembersOutputSchema = z.array(getMemberOutputSchema);

export const getRolesInputSchema = getMembersInputSchema;

export type Network = z.infer<typeof networkSchema>;
export type GetAllNetworkSchema = z.infer<typeof getAllNetworkSchema>;
export type CreateNetworkValues = z.infer<typeof createNetworkSchema>;
export type NetworkMember = z.infer<typeof getMemberOutputSchema>;
