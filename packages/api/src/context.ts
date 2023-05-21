import type {
  SignedInAuthObject,
  SignedOutAuthObject,
  User,
} from "@clerk/nextjs/api";
import { getAuth } from "@clerk/nextjs/server";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma, type PrismaClient } from "@acme/db";

import { firestore } from "./firebase";

export type AuthObject<
  T extends Pick<SignedInAuthObject | SignedOutAuthObject, "userId">,
> = Pick<T, "userId"> & {
  user?: Pick<User, "id" | "firstName" | "lastName"> | null;
};

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type AuthContextProps = {
  auth?: AuthObject<SignedInAuthObject | SignedOutAuthObject>;
  prisma?: PrismaClient;
  useFirestore?: boolean;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createInnerTRPCContext = (opts?: AuthContextProps) => {
  return {
    auth: opts?.auth,
    prisma: opts?.prisma ?? prisma,
    firestore: firestore,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({ auth: getAuth(opts.req) });
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
