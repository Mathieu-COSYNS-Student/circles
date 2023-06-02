import { TRPCError } from "@trpc/server";
import moment from "moment";
import { z } from "zod";

import {
  NETWORK_CIRCLES,
  NETWORK_INVITE,
  NETWORK_MEMBERS,
  NETWORK_ROLES,
  type Permission,
} from "@acme/accesscontrol";
import { Prisma, type NetworkMember } from "@acme/db";
import {
  circleSchema,
  createNetworkSchema,
  getAllNetworkSchema,
  getCirclesInputSchema,
  getMembersInputSchema,
  getMembersOutputSchema,
  getRolesInputSchema,
  joinNetworkSchema,
  networkInviteSchema,
  networkSchema,
  roleSchema,
} from "@acme/schema";

import { getUsers } from "../data/users";
import { protectedProcedure, router } from "../trpc";
import { assertAccess } from "../utils/accesscontrol";
import { permissionFilter } from "../utils/prisma";

export const networksRouter = router({
  getAll: protectedProcedure
    .input(getAllNetworkSchema)
    .output(z.array(networkSchema))
    .query(async ({ ctx, input }) => {
      const createFilter = (enable: boolean, permission: Permission) =>
        enable
          ? {
              status: "JOINED" as const,
              roles: {
                some: {
                  ...permissionFilter({
                    userId: ctx.auth?.userId,
                    permission,
                  }),
                },
              },
            }
          : {};
      const filterCanInviteMembersQuery = createFilter(
        input.filter.canInviteMembers,
        {
          action: "CREATE",
          resource: NETWORK_INVITE,
        },
      );
      const filterCanCreateCirclesMembersQuery = createFilter(
        input.filter.canCreateCircles,
        {
          action: "CREATE",
          resource: NETWORK_CIRCLES,
        },
      );
      const networks = await ctx.prisma.network.findMany({
        where: {
          members: {
            some: {
              AND: [
                { userId: ctx.auth?.userId },
                filterCanInviteMembersQuery,
                filterCanCreateCirclesMembersQuery,
              ],
            },
          },
        },
      });
      return networks;
    }),
  getCircles: protectedProcedure
    .input(getCirclesInputSchema)
    .output(
      z.array(
        circleSchema.pick({ id: true, name: true, pictureUrl: true }).merge(
          z.object({
            membersCount: z.number(),
          }),
        ),
      ),
    )
    .query(async ({ ctx, input }) => {
      await assertAccess(ctx.ac.in(input.networkId).read(NETWORK_CIRCLES));

      const circles = await ctx.prisma.circle.findMany({
        select: {
          id: true,
          name: true,
          pictureUrl: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
        where: {
          networkId: input.networkId,
        },
      });

      return circles.map((circle) => ({
        ...circle,
        membersCount: circle._count.members,
      }));
    }),
  getMembers: protectedProcedure
    .input(getMembersInputSchema)
    .output(getMembersOutputSchema)
    .query(async ({ ctx, input }) => {
      await assertAccess(ctx.ac.in(input.networkId).read(NETWORK_MEMBERS));

      const members = await ctx.prisma.networkMember.findMany({
        select: {
          userId: true,
          roles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: {
          networkId: input.networkId,
        },
      });

      const users = await getUsers(members.map((member) => member.userId));

      return members
        .map((member) => {
          const user = users[member.userId];
          return {
            ...user,
            roles: member.roles.map(({ role }) => ({
              ...role,
            })),
          };
        })
        .filter(
          (member): member is z.infer<typeof getMembersOutputSchema.element> =>
            !!member.id,
        );
    }),
  getRoles: protectedProcedure
    .input(getRolesInputSchema)
    .output(z.array(roleSchema))
    .query(async ({ ctx, input }) => {
      await assertAccess(ctx.ac.in(input.networkId).read(NETWORK_ROLES));

      const roles = await ctx.prisma.networkRole.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          networkId: input.networkId,
        },
      });

      return roles;
    }),
  create: protectedProcedure
    .input(createNetworkSchema)
    .output(networkSchema)
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
        return network;
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
      await assertAccess(ctx.ac.in(input.networkId).create(NETWORK_INVITE));

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

      return networkMember;
    }),
});
