import { useEffect } from "react";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { renderIconHeaderTitle } from "~/components/IconHeaderTitle";
import Chat from "~/components/chat/Chat";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

export const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const chatQuery = trpc.chats.getChatList.useQuery();
  const chat =
    chatQuery.data?.find((chat) => chat.id === route.params.id) || route.params;

  useEffect(() => {
    navigation.setOptions({
      title: chat.name,
      headerTitle: renderIconHeaderTitle(chat),
    });
  }, [chat, navigation]);

  return <Chat chatId={chat.id} />;
};
