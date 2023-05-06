import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import Chat from "~/components/chat/Chat";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

export const ChatScreen = ({ route }: ChatScreenProps) => {
  const { id } = route.params;

  return <Chat chatId={id} />;
};
