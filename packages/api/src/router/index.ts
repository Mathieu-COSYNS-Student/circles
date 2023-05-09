import { router } from "../trpc";
import { authRouter } from "./auth";
import { chatsRouter } from "./chats";
import { circlesRouter } from "./circles";
import { healthRouter } from "./health";
import { networksRouter } from "./networks";
import { usersRouter } from "./users";

export const appRouter = router({
  auth: authRouter,
  health: healthRouter,
  circles: circlesRouter,
  users: usersRouter,
  chats: chatsRouter,
  networks: networksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
