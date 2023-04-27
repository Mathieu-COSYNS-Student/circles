import { describe, expect, it } from "@jest/globals";

import { appRouter } from ".";
import { createInnerTRPCContext } from "../context";

describe("health check test", () => {
  it("should be running", async () => {
    const caller = appRouter.createCaller(createInnerTRPCContext());

    const result = await caller.health.check();

    expect(result).toStrictEqual({ server: "running" });
  });
});
