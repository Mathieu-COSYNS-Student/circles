import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "~/components/ui";
import { type MainTabParamList } from "~/navigators/MainTabNavigator";

type TasksScreenProps = NativeStackScreenProps<MainTabParamList, "Tasks">;

export const TasksScreen = ({}: TasksScreenProps) => {
  return (
    <View className="h-full items-center justify-center">
      <Text>TasksScreen</Text>
    </View>
  );
};
