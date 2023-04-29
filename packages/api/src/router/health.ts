import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export interface CheckResponse {
  server: "running";
  firebase?: unknown;
}

export const healthRouter = router({
  check: publicProcedure
    .input(z.object({ firebase: z.boolean().default(false) }).default({}))
    .query(async ({ ctx, input }) => {
      const result: CheckResponse = {
        server: "running",
      };
      if (input.firebase) {
        const element = await ctx
          .firestore()
          .collection("check")
          .doc("firebase")
          .get();
        result.firebase = element.data()?.ok || false;
      }
      return result;
    }),
});
