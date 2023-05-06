import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "~/components/ui";
import { type MainTabParamList } from "~/navigators/MainTabNavigator";

type HomeScreenProps = NativeStackScreenProps<MainTabParamList, "Home">;

export const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <View className="h-full items-center justify-center">
      <Text>HomeScreen</Text>
    </View>
  );
};
