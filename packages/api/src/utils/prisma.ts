import { type Action, type Prisma } from "@acme/db";

export const permissionFilter = ({
  userId,
  networkId,
  resource,
  action,
  ownership,
}: {
  userId: string;
  networkId?: string;
  action: Action;
  resource: string;
  ownership?: boolean;
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
            resource,
            action,
            ownership: ownership || undefined,
          },
        },
      },
    ],
  },
});
