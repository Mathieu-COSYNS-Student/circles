import { publicProcedure, router } from "../trpc";

export const circlesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.circle.findMany();
  }),
});
