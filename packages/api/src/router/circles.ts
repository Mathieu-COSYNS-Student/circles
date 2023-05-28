import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Prisma } from "@acme/db";
import {
  circleSchema,
  createCircleSchema,
  getCircleSchema,
  updateCircleSchema,
  type ChatRole,
} from "@acme/schema";

import { protectedProcedure, router } from "../trpc";

export const circlesRouter = router({
  getAll: protectedProcedure //
    .query(async ({ ctx }) => {
      const dbCircles = await ctx.prisma.circle.findMany({
        where: {
          members: {
            some: {
              userId: ctx.auth?.userId,
            },
          },
        },
      });
      const circles = dbCircles.map((circle) => {
        circle.pictureUrl = circle.pictureUrl;
        return circle;
      });
      return z.array(circleSchema).parse(circles);
    }),
  get: protectedProcedure
    .input(getCircleSchema)
    .query(async ({ ctx, input }) => {
      const { id, chatId } = input;
      const circle = await ctx.prisma.circle.findFirst({
        where: {
          OR: [{ id: id }, { chatId: chatId }],
          members: {
            some: {
              userId: ctx.auth?.userId,
            },
          },
        },
      });
      if (!circle) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return circleSchema.omit({ members: true }).parse(circle);
    }),
  create: protectedProcedure
    .input(createCircleSchema)
    .mutation(async ({ ctx, input }) => {
      const chatRoles: ChatRole = {};
      chatRoles[ctx.auth.userId] = "writer";
      const chatFirebaseDocument = await ctx
        .firestore()
        .collection("chats")
        .add({
          roles: chatRoles,
        });
      const newCircle = await ctx.prisma.circle.create({
        data: {
          name: input.name,
          chatId: chatFirebaseDocument.id,
          members: {
            create: [
              {
                userId: ctx.auth.userId,
                status: "JOINED",
                role: "ADMIN",
              },
            ],
          },
        },
        include: {
          members: true,
        },
      });
      return circleSchema.omit({ members: true }).parse(newCircle);
    }),
  update: protectedProcedure
    .input(updateCircleSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedCircle = await ctx.prisma.circle.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
          },
        });
        return circleSchema.omit({ members: true }).parse(updatedCircle);
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2025" || err.code === "P2023") {
            throw new TRPCError({
              code: "NOT_FOUND",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause: err,
          });
        }
      }
    }),
});
