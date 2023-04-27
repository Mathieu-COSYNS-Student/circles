import { describe, expect, it } from "@jest/globals";

import { appRouter } from ".";
import { authMock } from "../__test__/mocks";
import { createInnerTRPCContext } from "../context";

describe("users test", () => {
  it("should", async () => {
    const caller = appRouter.createCaller(
      createInnerTRPCContext({ auth: authMock }),
    );

    const result = await caller.users.getByIds([
      "user_2P150vExXFgPZQJEkwBkfHAJl8n",
      "user_2P14wwn2VJgBsMESQ3Qg7xITXLd",
    ]);

    expect(result).toHaveProperty("user_2P150vExXFgPZQJEkwBkfHAJl8n");
    expect(result).toHaveProperty("user_2P14wwn2VJgBsMESQ3Qg7xITXLd");
  });
});
