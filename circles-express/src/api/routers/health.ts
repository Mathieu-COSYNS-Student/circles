import { observable } from '@trpc/server/observable';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const getHealthStatus = () => {
  return {
    server: 'running',
  };
};

export const healthRouter = createTRPCRouter({
  check: publicProcedure.query(() => getHealthStatus()),
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});
