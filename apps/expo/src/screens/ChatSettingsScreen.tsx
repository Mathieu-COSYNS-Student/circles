import { Image, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { CircleSettings } from "~/components/CircleSettings";
import { PrivateMessageSettings } from "~/components/PrivateMessageSettings";
import { Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ChatSettings"
>;

export const ChatSettingsScreen = ({ route }: ChatSettingsScreenProps) => {
  const chatQuery = trpc.chats.getChatList.useQuery();
  const chat =
    chatQuery.data?.find((chat) => chat.id === route.params.id) || route.params;

  return (
    <View className="p-2">
      <View className="mt-2 items-center">
        <Image
          className="mb-1 aspect-square max-h-[100] w-1/3 max-w-[100] rounded-full"
          source={{ uri: chat.pictureUrl }}
          alt={`${chat.name} icon`}
        />
        <Text className="mb-8 mt-4" type="heading2">
          {chat.name}
        </Text>
        {chat.type === "circle" && <CircleSettings chat={chat} />}
        {chat.type === "private_message" && (
          <PrivateMessageSettings chat={chat} />
        )}
      </View>
    </View>
  );
};