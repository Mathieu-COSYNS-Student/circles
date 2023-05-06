import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { ChatList } from "~/components/chat/ChatList";
import { type MainTabParamList } from "~/navigators/MainTabNavigator";

type ChatsScreenProps = NativeStackScreenProps<MainTabParamList, "Chats">;

export const ChatsScreen = ({}: ChatsScreenProps) => {
  const getChatList = trpc.chats.getChatList.useQuery();

  const onRefresh = () => {
    getChatList.refetch();
  };

  return (
    <>
      {getChatList.data && (
        <ChatList
          chats={getChatList.data}
          refreshing={getChatList.isRefetching}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};
