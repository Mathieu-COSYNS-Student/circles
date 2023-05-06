import { FlatList } from "react-native";

import {
  type ChatListObject,
  type ChatList as ChatListType,
} from "@acme/schema";

import { RefreshControl, type RefreshControlProps } from "~/components/ui";
import { ChatListItem } from "./ChatListItem";

const _renderItem = ({ item }: { item: ChatListObject }) => {
  return <ChatListItem chat={item} />;
};

export type ChatListProps = {
  chats: ChatListType;
} & Pick<RefreshControlProps, "onRefresh" | "refreshing">;

export const ChatList = ({ chats, refreshing, onRefresh }: ChatListProps) => {
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={chats}
      renderItem={_renderItem}
    />
  );
};
