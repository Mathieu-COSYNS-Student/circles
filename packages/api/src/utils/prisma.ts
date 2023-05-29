import { type Permission } from "@acme/accesscontrol";
import { type Prisma } from "@acme/db";

export const permissionFilter = ({
  userId,
  networkId,
  permission,
}: {
  userId: string;
  networkId?: string;
  permission: Permission;
}): Prisma.NetworkMemberToNetworkRoleWhereInput => ({
  member: {
    userId,
  },
  role: {
    networkId: networkId,
    OR: [
      {
        hasAllPermissions: true,
      },
      {
        permissions: {
          some: {
            resource: permission.resource,
            action: permission.action,
            ownership: permission.ownership ? undefined : false,
          },
        },
      },
    ],
  },
});
