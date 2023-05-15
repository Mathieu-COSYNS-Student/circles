import { Image, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { PlatformPressable } from "@react-navigation/elements";

import { Text } from "~/components/ui";
import { useRootNavigation } from "~/navigators/useRootNavigation";

export const UserProfile = ({}) => {
  const { user } = useUser();
  const navigation = useRootNavigation();

  return (
    <PlatformPressable
      onPress={() => navigation.navigate("Account")}
      android_ripple={{
        radius: 170,
      }}
    >
      <View className="flex-row items-center p-3">
        <Image
          className="aspect-square max-h-[75] w-1/5 max-w-[75] rounded-full"
          source={{ uri: user?.profileImageUrl }}
          alt={`${user?.fullName} profile picture`}
        />
        <View className="ml-3 flex-shrink">
          <Text type="heading3" numberOfLines={1}>
            {user?.fullName}
          </Text>
          <Text numberOfLines={1}>@{user?.username}</Text>
        </View>
      </View>
    </PlatformPressable>
  );
};
