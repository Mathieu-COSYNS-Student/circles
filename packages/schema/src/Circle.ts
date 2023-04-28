import { z } from "zod";

import { circleMemberSchema } from "./CircleMember";

export const newCircleSchema = z.object({
  name: z.string().min(2),
  pictureUrl: z.string().url().optional(),
});

export const circleSchema = newCircleSchema
  .merge(
    z.object({
      id: z.string().min(24).max(24),
      name: z.string().min(2),
      chatId: z.string(),
      members: z.array(circleMemberSchema).optional(),
    }),
  )
  .required({ pictureUrl: true });

export type Circle = z.infer<typeof circleSchema>;
