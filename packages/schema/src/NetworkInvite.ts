import { z } from "zod";

import { networkSchema } from "./Network";

const codeInSchema = z.coerce.number().min(0).max(99999999);

const codeFormSchema = z.string().regex(/^\d{8}$/, "A code is 8 digits");

const codeOutSchema = z.coerce
  .string()
  .regex(/^\d{0,8}$/, "Code contains 8 digits")
  .transform((code) => code.padStart(8, "0"));

export const networkInviteSchema = z.object({
  id: z.string().min(24).max(24),
  networkId: networkSchema.shape.id,
  code: codeOutSchema,
  expireAt: z
    .string()
    .datetime()
    .or(z.date().transform((date) => date.toISOString())),
  used: z.boolean(),
});

export const createNetworkInviteSchema = networkInviteSchema.pick({
  networkId: true,
});

export const joinNetworkSchema = z
  .object({
    networkName: networkSchema.shape.name,
    code: codeInSchema,
  })
  .or(
    networkInviteSchema
      .pick({
        id: true,
      })
      .merge(
        z.object({
          code: codeInSchema,
        }),
      ),
  );

export const joinNetworkFormSchema = z.object({
  networkName: networkSchema.shape.name,
  code: codeFormSchema,
});

export type NetworkInvite = z.infer<typeof networkInviteSchema>;
export type CreateNetworkInviteValues = z.infer<
  typeof createNetworkInviteSchema
>;
export type JoinNetworkFormValues = z.infer<typeof joinNetworkFormSchema>;
