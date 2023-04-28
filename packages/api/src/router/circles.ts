import { z } from "zod";

import { type Circle as DbCircle } from "@acme/db";
import { circleSchema, newCircleSchema, type ChatRole } from "@acme/schema";

import { protectedProcedure, router } from "../trpc";

export const getCirclePictureOrDefault = (circle: DbCircle) => {
  if (circle.pictureUrl) {
    return circle.pictureUrl;
  }

  const name = circle.name.replace(" ", "+");
  return `https://ui-avatars.com/api/?name=${name}&background=random`;
};

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
        circle.pictureUrl = getCirclePictureOrDefault(circle);
        return circle;
      });
      return z.array(circleSchema).parse(circles);
    }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const circle = await ctx.prisma.circle.findFirstOrThrow({
      where: {
        id: input,
        members: {
          some: {
            userId: ctx.auth?.userId,
          },
        },
      },
    });
    circle.pictureUrl = getCirclePictureOrDefault(circle);
    return circleSchema.omit({ members: true }).parse(circle);
  }),
  create: protectedProcedure
    .input(newCircleSchema)
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
          pictureUrl: input.pictureUrl,
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
      newCircle.pictureUrl = getCirclePictureOrDefault(newCircle);
      return circleSchema.omit({ members: true }).parse(newCircle);
    }),
});
