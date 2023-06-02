import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { NETWORK_CIRCLES } from "@acme/accesscontrol";
import { Prisma } from "@acme/db";
import {
  addOrRemoveCircleMembersSchema,
  circleMemberSchema,
  circleSchema,
  createCircleSchema,
  deleteCircleSchema,
  getCircleMembersSchema,
  getCircleSchema,
  updateCircleSchema,
  type ChatRole,
  type CircleMember,
} from "@acme/schema";

import { usersIds2CirclesMembers } from "../data/circles";
import { getUsers } from "../data/users";
import { protectedProcedure, router } from "../trpc";
import { assertAccess } from "../utils/accesscontrol";

export const circlesRouter = router({
  getAll: protectedProcedure
    .input(z.void())
    .output(z.array(circleSchema))
    .query(async ({ ctx }) => {
      const circles = await ctx.prisma.circle.findMany({
        where: {
          members: {
            some: {
              networkMember: {
                userId: ctx.auth?.userId,
              },
            },
          },
        },
      });
      return circles;
    }),
  get: protectedProcedure
    .input(getCircleSchema)
    .output(circleSchema)
    .query(async ({ ctx, input }) => {
      const { id, chatId } = input;
      const circle = await ctx.prisma.circle.findFirst({
        where: {
          OR: [{ id: id }, { chatId: chatId }],
          members: {
            some: {
              networkMember: {
                userId: ctx.auth?.userId,
              },
            },
          },
        },
      });
      if (!circle) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return circle;
    }),
  create: protectedProcedure
    .input(createCircleSchema)
    .output(circleSchema)
    .mutation(async ({ ctx, input }) => {
      await assertAccess(ctx.ac.in(input.networkId).create(NETWORK_CIRCLES));

      const circlesCreator = await ctx.prisma.networkMember.findFirst({
        select: {
          id: true,
        },
        where: {
          networkId: input.networkId,
          userId: ctx.auth.userId,
        },
      });

      if (!circlesCreator) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

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
          networkId: input.networkId,
          members: {
            createMany: {
              data: [
                {
                  networkMemberId: circlesCreator.id,
                  status: "JOINED",
                  role: "ADMIN",
                },
                ...(await usersIds2CirclesMembers(
                  ctx.prisma,
                  input.networkId,
                  input.members,
                )),
              ],
            },
          },
        },
        include: {
          members: true,
        },
      });
      return newCircle;
    }),
  update: protectedProcedure
    .input(updateCircleSchema)
    .output(circleSchema)
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
        return updatedCircle;
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2025" || err.code === "P2023") {
            throw new TRPCError({
              code: "NOT_FOUND",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
  delete: protectedProcedure
    .input(deleteCircleSchema)
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.circleMember.deleteMany({
          where: {
            circleId: input.id,
          },
        });
        await ctx.prisma.circle.delete({
          where: {
            id: input.id,
          },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2025" || err.code === "P2023") {
            throw new TRPCError({
              code: "NOT_FOUND",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
  getMembers: protectedProcedure
    .input(getCircleMembersSchema)
    .output(z.array(circleMemberSchema))
    .query(async ({ ctx, input }) => {
      try {
        const members = await ctx.prisma.circleMember.findMany({
          where: {
            circleId: input.id,
          },
          select: {
            status: true,
            role: true,
            networkMember: {
              select: {
                userId: true,
              },
            },
          },
        });

        const users = await getUsers(
          members.map((member) => member.networkMember.userId),
        );

        return members
          .map((member) => {
            const user = users[member.networkMember.userId];
            return {
              user,
              status: member.status,
              role: member.role,
            };
          })
          .filter((member): member is CircleMember => !!member.user);
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2025" || err.code === "P2023") {
            throw new TRPCError({
              code: "NOT_FOUND",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
  addMembers: protectedProcedure
    .input(addOrRemoveCircleMembersSchema)
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      try {
        const network = await ctx.prisma.networkMember.findFirst({
          select: {
            networkId: true,
          },
          where: {
            CircleMember: {
              some: {
                circleId: input.id,
              },
            },
          },
        });
        if (!network) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Impossible to find the network containing the circle with id ${input.id}`,
          });
        }
        await ctx.prisma.circleMember.createMany({
          data: (await usersIds2CirclesMembers(
            ctx.prisma,
            network.networkId,
            input.members,
            input.id,
          )) as {
            networkMemberId: string;
            circleId: string;
            status: "INVITED";
          }[],
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
  removeMembers: protectedProcedure
    .input(addOrRemoveCircleMembersSchema)
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.circleMember.deleteMany({
          where: {
            networkMember: {
              userId: {
                in: input.members,
              },
            },
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
});
