import { expect, test } from "@jest/globals";
import { type Circle, type PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

import { appRouter } from "..";
import { createInnerTRPCContext } from "../../context";

test("circles getAll test", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Circle[] = [
    {
      id: "test-user-id",
      name: "test-name",
    },
    {
      id: "test-user-id-2",
      name: "test-name-2",
    },
  ];

  prismaMock.circle.findMany.mockResolvedValue(mockOutput);

  const caller = appRouter.createCaller(
    createInnerTRPCContext({ prisma: prismaMock }),
  );

  const result = await caller.circles.getAll();

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});

// test('circles getAll test', async () => {
//   const caller = appRouter.createCaller(createInnerTRPCContext());
//
//   const result = await caller.circles.getAll();
//
//   expect(result).toHaveLength(5);
// });
