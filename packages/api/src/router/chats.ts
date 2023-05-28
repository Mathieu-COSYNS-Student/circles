import { chatListSchema, type ChatListObject } from "@acme/schema";

import { protectedProcedure, router } from "../trpc";

export const chatsRouter = router({
  getChatList: protectedProcedure //
    .query(async ({ ctx }) => {
      const dbCircles = await ctx.prisma.circle.findMany({
        where: {
          members: {
            some: {
              networkMember: {
                userId: ctx.auth?.userId,
              },
            },
          },
        },
        select: {
          name: true,
          pictureUrl: true,
          chatId: true,
        },
      });
      const chats = dbCircles.map((circle): ChatListObject => {
        return {
          id: circle.chatId,
          name: circle.name,
          pictureUrl: circle.pictureUrl,
          type: "circle",
        };
      });
      return chatListSchema.parse(chats);
    }),
});
