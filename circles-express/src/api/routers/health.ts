import { createTRPCRouter, publicProcedure } from '../trpc';

export const healthRouter = createTRPCRouter({
  check: publicProcedure.query(() => {
    return {
      server: 'running',
    };
  }),
});
