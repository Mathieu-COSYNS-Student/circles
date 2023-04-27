import clerkClient from "@clerk/clerk-sdk-node";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const usersRouter = router({
  getByIds: protectedProcedure
    .input(z.array(z.string().min(1)))
    .query(async ({ input }) => {
      const users = await clerkClient.users.getUserList({
        userId: input,
      });

      return Object.fromEntries(
        users.map((user) => [
          user.id,
          {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: user.profileImageUrl,
          },
        ]),
      );
    }),
});
