import { router } from "../trpc";
import { authRouter } from "./auth";
import { circlesRouter } from "./circles";
import { healthRouter } from "./health";

export const appRouter = router({
  auth: authRouter,
  health: healthRouter,
  circles: circlesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
