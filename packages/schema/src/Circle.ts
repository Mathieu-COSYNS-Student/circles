import { z } from "zod";

export const circleSchema = z.object({
  id: z.string().min(24).max(24),
  name: z.string().min(2, "name must contain at least 2 character"),
  pictureUrl: z.string().url().or(z.null()),
  networkId: z.string(),
  chatId: z.string(),
});

export const getCircleSchema = circleSchema
  .pick({
    id: true,
    chatId: true,
  })
  .partial()
  .refine((data) => data.id || data.chatId, {
    message: "Either id or chatId must be set",
    path: ["id", "chatId"],
  })
  .refine((data) => !data.id || !data.chatId, {
    message: "Can not use id and chatId simultaneously",
    path: ["id", "chatId"],
  });

export const createCircleSchema = circleSchema.pick({
  name: true,
  networkId: true,
}).merge(z.object({
  members: z.array(z.string()),
}));

export const updateCircleSchema = circleSchema
  .pick({
    id: true,
    name: true,
  })
  .partial({
    name: true,
  });

export const deleteCircleSchema = circleSchema.pick({
  id: true,
});

export const getCircleMembersSchema = z.object({
  id: z.string(),
});

export const addOrRemoveCircleMembersSchema = z.object({
  id: z.string(),
  members: z.array(z.string()),
});

export type Circle = z.infer<typeof circleSchema>;
export type GetCircleValues = z.infer<typeof getCircleSchema>;
export type CreateCircleValues = z.infer<typeof createCircleSchema>;
export type UpdateCircleValues = z.infer<typeof updateCircleSchema>;
export type DeleteCircleValues = z.infer<typeof deleteCircleSchema>;
