import { TRPCError } from "@trpc/server";

import { type PrismaClient } from "@acme/db";

export const usersIds2CirclesMembers = async (
  prisma: PrismaClient,
  networkId: string,
  usersIds: string[],
  circleId?: string,
) => {
  try {
    const networkMembers = await prisma.networkMember.findMany({
      select: {
        userId: true,
        id: true,
      },
      where: {
        networkId,
        userId: {
          in: usersIds,
        },
      },
    });

    return networkMembers
      .map((networkMember) => ({
        networkMemberId: networkMember.id,
        circleId,
        status: "INVITED",
      }))
      .filter(
        (
          member,
        ): member is {
          networkMemberId: string;
          circleId: string | undefined;
          status: "INVITED";
        } => !!member.networkMemberId,
      );
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: err,
    });
  }
};
