import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type ChatListObject } from "@acme/schema";

import { trpc } from "~/utils/trpc";
import { QueryDataFlatList } from "~/components/QueryDataFlatList";
import { ChatListItem } from "~/components/chat/ChatListItem";
import { type MainTabParamList } from "~/navigators/MainTabNavigator";

type ChatsScreenProps = NativeStackScreenProps<MainTabParamList, "Chats">;

const _renderItem = ({ item }: { item: ChatListObject }) => {
  return <ChatListItem chat={item} />;
};

export const ChatsScreen = ({}: ChatsScreenProps) => {
  const getChatList = trpc.chats.getChatList.useQuery();

  return (
    <QueryDataFlatList
      query={getChatList}
      renderItem={_renderItem}
      emptyText="No chats to show"
    />
  );
};
