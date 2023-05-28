import { isEqual, uniqWith } from "lodash";

import { type Permission } from "@acme/accesscontrol";

import { protectedProcedure, router } from "../trpc";

export const permissionsRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const networks = await ctx.prisma.network.findMany({
      where: {
        members: {
          some: {
            userId: ctx.auth.userId,
          },
        },
      },
      select: {
        id: true,
        roles: {
          where: {
            members: {
              some: {
                member: {
                  userId: ctx.auth.userId,
                },
              },
            },
          },
          select: {
            hasAllPermissions: true,
            permissions: {
              select: {
                action: true,
                resource: true,
                ownership: true,
              },
            },
          },
        },
      },
    });

    return networks.reduce((prev, curr) => {
      const permissions = curr.roles.flatMap<true | Permission>((value) => {
        if (value.hasAllPermissions) return true;
        return value.permissions;
      });

      return {
        ...prev,
        [curr.id]:
          permissions.includes(true) ||
          uniqWith(permissions as Permission[], isEqual),
      };
    }, {} as Record<string, true | Permission[]>);
  }),
});
