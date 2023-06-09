import { describe, expect, it } from "@jest/globals";
import { type Circle, type PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

import { appRouter } from ".";
import { authMock } from "../__test__/mocks";
import { createInnerTRPCContext } from "../context";

describe("circles get test", () => {
  it("should get all", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const mockFindMany = [
      {
        id: "test-user-id_00000000001",
        networkId: "test-network-id_00000001",
        name: "test-name",
        pictureUrl: "https://www.gravatar.com/avatar?d=mp",
        chatId: "1",
      },
      {
        id: "test-user-id_00000000002",
        networkId: "test-network-id_00000001",
        name: "test-name-2",
        pictureUrl: null,
        chatId: "2",
      },
    ];

    prismaMock.circle.findMany.mockResolvedValue(mockFindMany);

    const caller = appRouter.createCaller(
      createInnerTRPCContext({ prisma: prismaMock, auth: authMock }),
    );

    const result = await caller.circles.getAll();

    expect(result).toHaveLength(mockFindMany.length);
    expect(result).toStrictEqual(mockFindMany);
  });

  it("should get one", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const mockOutput = {
      id: "test-user-id_00000000001",
      networkId: "test-network-id_00000001",
      name: "test-name",
      pictureUrl: "https://www.gravatar.com/avatar?d=mp",
      chatId: "1",
    };

    prismaMock.circle.findFirst.mockResolvedValue(mockOutput);

    const caller = appRouter.createCaller(
      createInnerTRPCContext({ prisma: prismaMock, auth: authMock }),
    );

    const result = await caller.circles.get({ id: mockOutput.id });

    expect(result).toStrictEqual(mockOutput);
  });
});

describe("circles create test", () => {
  const create = async (mockCircle: Circle) => {
    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller(
      createInnerTRPCContext({ prisma: prismaMock, auth: authMock }),
    );

    const networkMember = {
      id: "1",
      networkId: "1",
      userId: authMock.userId,
      status: "JOINED" as const,
    };

    prismaMock.networkMember.findFirst.mockResolvedValue(networkMember);
    prismaMock.circle.create.mockResolvedValue(mockCircle);
    prismaMock.networkMember.findMany.mockResolvedValue([networkMember]);

    return await caller.circles.create({
      name: mockCircle.name,
      networkId: "test-network-id_00000001",
      members: [],
    });
  };

  it("should create a circle", async () => {
    const mockOutput = {
      id: "circle-id_00000000000001",
      networkId: "test-network-id_00000001",
      name: "test circle",
      pictureUrl: "https://www.gravatar.com/avatar?d=mp",
      chatId: "1",
    };

    const result = await create(mockOutput);
    expect(result).toStrictEqual(mockOutput);
  });

  it("should create a circle without a image", async () => {
    const mockOutput = {
      id: "circle-id_00000000000001",
      networkId: "test-network-id_00000001",
      name: "test circle",
      pictureUrl: null,
      chatId: "1",
    };

    const result = await create(mockOutput);
    expect(result).toStrictEqual(mockOutput);
  });
});
