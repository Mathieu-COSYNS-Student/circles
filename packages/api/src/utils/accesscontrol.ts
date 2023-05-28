import { TRPCError } from "@trpc/server";

export const assertAccess = async (result: boolean | Promise<boolean>) => {
  if (!(await result)) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
};
