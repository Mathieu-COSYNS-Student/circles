import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type NetworkJoinScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkJoin"
>;

export const NetworkJoinScreen = ({}: NetworkJoinScreenProps) => {
  return (
    <View>
      <Text>NetworkJoinScreen</Text>
    </View>
  );
};
