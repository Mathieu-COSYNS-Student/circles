import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { circleSchema, userSchema } from '@circles/shared';

export const circlesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.circle.findMany();
  }),
});
