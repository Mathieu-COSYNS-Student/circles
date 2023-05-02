import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type CircleSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CircleSettings"
>;

const CircleSettingsScreen = ({}: CircleSettingsScreenProps) => {
  return <Text>Settings page for a circle</Text>;
};

export default CircleSettingsScreen;
