import { z } from "zod";

import { createNetworkSchema, networkSchema } from "@acme/schema";

import { protectedProcedure, router } from "../trpc";

export const networksRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const networks = await ctx.prisma.network.findMany({
      where: {
        members: {
          some: {
            userId: ctx.auth?.userId,
          },
        },
      },
    });
    return z.array(networkSchema).parse(networks);
  }),
  create: protectedProcedure
    .input(createNetworkSchema)
    .mutation(async ({ ctx, input }) => {
      const network = await ctx.prisma.network.create({
        data: {
          name: input.name,
          members: {
            create: [
              {
                userId: ctx.auth.userId,
                status: "JOINED",
                role: "OWNER",
              },
            ],
          },
        },
      });
      return networkSchema.omit({ members: true }).parse(network);
    }),
});
