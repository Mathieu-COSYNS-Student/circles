import { type SignedInAuthObject } from "@clerk/nextjs/api";
import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import { AccessControl } from "@acme/accesscontrol";

import { transformer } from "../transformer";
import type { AuthObject, Context } from "./context";
import { permissionFilter } from "./utils/prisma";

const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth || !ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({
    ctx: {
      auth: ctx.auth as AuthObject<SignedInAuthObject>,
      ac: new AccessControl<string, string>({
        grants: async ({ user, context, permission }) => {
          const allowed = await ctx.prisma.networkMemberToNetworkRole.findFirst(
            {
              select: {
                roleId: true,
              },
              where: permissionFilter({
                userId: user,
                networkId: context,
                permission,
              }),
            },
          );

          return allowed !== null;
        },
      }).can(ctx.auth.userId),
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
