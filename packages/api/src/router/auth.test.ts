import { describe, expect, it } from "@jest/globals";
import { TRPCError } from "@trpc/server";

import { appRouter } from ".";
import { authMock } from "../__test__/mocks";
import { getError } from "../__test__/utils";
import { createInnerTRPCContext } from "../context";

describe("session test", () => {
  it("should be undefined", async () => {
    const caller = appRouter.createCaller(createInnerTRPCContext());
    const result = await caller.auth.getSession();
    expect(result).toBeUndefined();
  });
  it("should be equals to auth", async () => {
    const caller = appRouter.createCaller(
      createInnerTRPCContext({ auth: authMock }),
    );
    const result = await caller.auth.getSession();
    expect(result).toEqual(authMock);
  });
});

describe("secret message test", () => {
  it("should not see secret message", async () => {
    const caller = appRouter.createCaller(createInnerTRPCContext());
    const error = await getError(caller.auth.getSecretMessage);
    expect(error).toBeInstanceOf(TRPCError);
    expect(error).toHaveProperty("code", "UNAUTHORIZED");
  });
  it("should see secret message", async () => {
    const caller = appRouter.createCaller(
      createInnerTRPCContext({
        auth: authMock,
      }),
    );
    const result = await caller.auth.getSecretMessage();
    expect(result).toStrictEqual("you can see this secret message!");
  });
});
