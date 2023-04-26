import { expect, test } from "@jest/globals";

import { appRouter } from "..";
import { createInnerTRPCContext } from "../../context";

test("health check test", async () => {
  const caller = appRouter.createCaller(createInnerTRPCContext());

  const result = await caller.health.check();

  expect(result).toStrictEqual({ server: "running", auth: null });
});
