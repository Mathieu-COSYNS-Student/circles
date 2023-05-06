import { Image, View } from "react-native";
import { HeaderTitle, type HeaderTitleProps } from "@react-navigation/elements";
import { type RouteProp } from "@react-navigation/native";

import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatRoute = RouteProp<RootStackParamList, "Chat">;

export const renderChatHeaderTitle = (route: ChatRoute) => {
  const ChatHeaderTitle = ({ ...props }: HeaderTitleProps) => {
    return (
      <View className="flex flex-row">
        <Image
          className="mr-2 aspect-square h-full rounded-full"
          source={{ uri: route.params.pictureUrl }}
          alt={`${route.params.name} icon`}
        />
        <HeaderTitle {...props} />
      </View>
    );
  };
  return ChatHeaderTitle;
};
