import { chatListSchema, type ChatListObject } from "@acme/schema";

import { protectedProcedure, router } from "../trpc";
import { getCirclePictureOrDefault } from "./circles";

export const chatsRouter = router({
  getChatList: protectedProcedure //
    .query(async ({ ctx }) => {
      const dbCircles = await ctx.prisma.circle.findMany({
        where: {
          members: {
            some: {
              userId: ctx.auth?.userId,
            },
          },
        },
      });
      const chats = dbCircles.map((circle): ChatListObject => {
        return {
          id: circle.chatId,
          name: circle.name,
          pictureUrl: getCirclePictureOrDefault(circle),
          type: "circle",
        };
      });
      return chatListSchema.parse(chats);
    }),
});
