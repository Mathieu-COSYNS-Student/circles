import { z } from "zod";

import { getUsers } from "../data/users";
import { protectedProcedure, router } from "../trpc";

export const usersRouter = router({
  getByIds: protectedProcedure
    .input(z.array(z.string().min(1)))
    .query(async ({ input }) => {
      return await getUsers(input);
    }),
});
