import { TRPCError } from "@trpc/server";
import moment from "moment";
import { z } from "zod";

import { NETWORK_INVITE } from "@acme/accesscontrol";
import { Prisma, type NetworkMember } from "@acme/db";
import {
  createNetworkSchema,
  getAllNetworkSchema,
  joinNetworkSchema,
  networkInviteSchema,
  networkMemberSchema,
  networkSchema,
} from "@acme/schema";

import { protectedProcedure, router } from "../trpc";
import { permissionFilter } from "../utils/prisma";

export const networksRouter = router({
  getAll: protectedProcedure
    .input(getAllNetworkSchema)
    .query(async ({ ctx, input }) => {
      const filterCanInviteMembersQuery = input.filter.canInviteMembers
        ? {
            status: "JOINED" as const,
            roles: {
              some: {
                ...permissionFilter({
                  userId: ctx.auth?.userId,
                  action: "CREATE",
                  resource: NETWORK_INVITE,
                }),
              },
            },
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
      try {
        const network = await ctx.prisma.$transaction(async (tx) => {
          const network = await tx.network.create({
            data: {
              name: input.name,
              owner: ctx.auth.userId,
              members: {
                create: [
                  {
                    userId: ctx.auth.userId,
                    status: "JOINED",
                  },
                ],
              },
              roles: {
                create: {
                  name: "Admin",
                  hasAllPermissions: true,
                },
              },
            },
            include: {
              members: {
                select: {
                  id: true,
                },
              },
              roles: {
                select: {
                  id: true,
                },
              },
            },
          });

          await tx.networkMemberToNetworkRole.create({
            data: {
              roleId: network.roles[0]?.id ?? "",
              memberId: network.members[0]?.id ?? "",
            },
          });

          return network;
        });
        return networkSchema.omit({ members: true }).parse(network);
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            if (err.meta?.target === "Network_owner_key")
              throw new TRPCError({
                code: "CONFLICT",
                message:
                  "You already have a network. You can only have one network.",
                cause: err,
              });
            if (err.meta?.target === "Network_name_key")
              throw new TRPCError({
                code: "CONFLICT",
                message:
                  "A network with the same name already exist in Circles. Pick a unique name.",
                cause: err,
              });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
  createInvite: protectedProcedure
    .input(networkInviteSchema.pick({ networkId: true }))
    .query(async ({ ctx, input }) => {
      if (!(await ctx.ac.in(input.networkId).create(NETWORK_INVITE))) {
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
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause: err,
          });
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
              memberId: networkMember.id,
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
