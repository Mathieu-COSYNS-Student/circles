import { createTRPCRouter } from './trpc';
import { circlesRouter } from './routers/circles';
import { healthRouter } from './routers/health';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  health: healthRouter,
  circles: circlesRouter,
});

export type AppRouter = typeof appRouter;

// export const appRouter = t.router({
//   greeting: t.procedure //
//     .query(() => 'hello tRPC v10!'),
//   getUser: t.procedure //
//     .input(z.string())
//     .query(async ({ input }) => {
//       return await prisma.user.findUnique({
//         where: {
//           email: input,
//         },
//       });
//     }),
//   getUsers: t.procedure //
//     .query(async () => {
//       return await prisma.user.findMany();
//     }),
//   createUser: t.procedure //
//     .input(userSchema)
//     .mutation(async (req) => {
//       return await prisma.user.create({ data: req.input });
//     }),
// });
