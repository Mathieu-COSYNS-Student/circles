import { z } from "zod";

import { userSchema } from "@acme/schema";

import { getUsers } from "../data/users";
import { protectedProcedure, router } from "../trpc";

export const usersRouter = router({
  getByIds: protectedProcedure
    .input(z.array(z.string().min(1)))
    .output(z.record(z.string(), userSchema.omit({ id: true })))
    .query(async ({ input }) => {
      return await getUsers(input);
    }),
});
