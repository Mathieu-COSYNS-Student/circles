import { z } from "zod";

import { chatMemberSchema } from "./ChatMember";

export const chatSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  pictureUrl: z.string().url().or(z.null()),
  type: z.enum(["private_message", "circle"]),
  members: z.array(chatMemberSchema),
});

export const chatListObjectSchema = chatSchema.pick({
  id: true,
  name: true,
  pictureUrl: true,
  type: true,
});

export const chatListSchema = z.array(chatListObjectSchema);

export type Chat = z.infer<typeof chatSchema>;
export type ChatList = z.infer<typeof chatListSchema>;
export type ChatListObject = z.infer<typeof chatListObjectSchema>;
