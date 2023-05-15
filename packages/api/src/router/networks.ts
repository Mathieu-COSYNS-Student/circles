import { TRPCError } from "@trpc/server";
import moment from "moment";
import { z } from "zod";

import {
  NETWORK_INVITE,
  grantedWithCustomRoles,
  type AccessControlQuery,
} from "@acme/accesscontrol";
import { Prisma, type NetworkMember } from "@acme/db";
import {
  createNetworkSchema,
  getAllNetworkSchema,
  joinNetworkSchema,
  networkInviteSchema,
  networkMemberSchema,
  networkSchema,
  type Network,
  type User,
} from "@acme/schema";

import { type Context } from "../context";
import { protectedProcedure, router } from "../trpc";

const getNetworkRole = async (
  ctx: Context,
  networkId: Network["id"],
  userId: User["id"],
) => {
  const networkMember = await ctx.prisma.networkMember.findFirst({
    where: {
      networkId,
      userId,
    },
  });
  if (!networkMember) return null;
  if (networkMember.status !== "JOINED") return null;
  return networkMember.role;
};

const hasAccess = async (query: AccessControlQuery) => {
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  return grantedWithCustomRoles(query, async (query) => {
    return {};
  });
};

export const networksRouter = router({
  getAll: protectedProcedure
    .input(getAllNetworkSchema)
    .query(async ({ ctx, input }) => {
      const filterCanInviteMembersQuery = input.filter.canInviteMembers
        ? {
            OR: [{ role: "ADMIN" as const }, { role: "OWNER" as const }],
            status: "JOINED" as const,
          }
        : {};
      const networks = await ctx.prisma.network.findMany({
        where: {
          members: {
            some: {
              AND: [{ userId: ctx.auth?.userId }, filterCanInviteMembersQuery],
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
  createInvite: protectedProcedure
    .input(networkInviteSchema.pick({ networkId: true }))
    .query(async ({ ctx, input }) => {
      const role = await getNetworkRole(ctx, input.networkId, ctx.auth.userId);

      if (
        !role ||
        !(await hasAccess({
          action: "create",
          resource: NETWORK_INVITE,
          role,
        }))
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const expireAt = moment().add(2, "days").toDate();
      let networkInvite;

      while (!networkInvite) {
        try {
          networkInvite = await ctx.prisma.networkInvite.create({
            data: {
              networkId: input.networkId,
              expireAt,
              code: Math.floor(Math.random() * 100000000),
            },
          });
        } catch (err) {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (
              err.code === "P2002" &&
              err.meta?.target === "NetworkInvite_code_networkId_key"
            ) {
              continue;
            }

            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              cause: err,
            });
          }
        }
      }
      return networkInviteSchema.parse(networkInvite);
    }),
  joinNetwork: protectedProcedure
    .input(joinNetworkSchema)
    .mutation(async ({ input, ctx }) => {
      const networkInviteWhere =
        "id" in input
          ? {
              id: input.id,
              code: input.code,
            }
          : {
              network: {
                name: input.networkName,
              },
              code: input.code,
            };

      const networkInvite = await ctx.prisma.networkInvite.findFirst({
        where: networkInviteWhere,
      });
      if (!networkInvite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The network name or the code is invalid",
        });
      }
      if (networkInvite.expireAt < new Date()) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "This invite code has expired",
        });
      }
      let networkMember: NetworkMember | null = null;
      try {
        networkMember = await ctx.prisma.$transaction(async (tx) => {
          const networkMember = await tx.networkMember.create({
            data: {
              userId: ctx.auth.userId,
              networkId: networkInvite.networkId,
              status: "JOINED",
            },
          });

          await tx.networkInvite.update({
            where: { id: networkInvite.id },
            data: {
              used: true,
              networkMemberId: networkMember.id,
            },
          });
          return networkMember;
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (
            err.code === "P2002" &&
            err.meta?.target === "NetworkMember_userId_networkId_key"
          ) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "You have already joined this network",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
      console.log({ networkMember });

      return networkMemberSchema.parse(networkMember);
    }),
});
