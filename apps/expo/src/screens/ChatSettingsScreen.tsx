import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { CircleSettings } from "~/components/CircleSettings";
import { PrivateMessageSettings } from "~/components/PrivateMessageSettings";
import { ScreenContentContainer, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/Avatar";
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
    <ScreenContentContainer>
      <View className="mt-2 items-center">
        <View className="mb-1 max-h-[100] w-1/3 max-w-[100]">
          <Avatar
            source={chat.pictureUrl ? { uri: chat.pictureUrl } : undefined}
            alt={chat.name}
          />
        </View>
        <Text className="mb-8 mt-4" type="heading2">
          {chat.name}
        </Text>
        {chat.type === "circle" && <CircleSettings chat={chat} />}
        {chat.type === "private_message" && (
          <PrivateMessageSettings chat={chat} />
        )}
      </View>
    </ScreenContentContainer>
  );
};
