import { z } from 'zod';

export const circleSchema = z.object({
  id: z.string().min(24).max(24),
  name: z.string().min(2),
});

export type Circle = z.infer<typeof circleSchema>;
