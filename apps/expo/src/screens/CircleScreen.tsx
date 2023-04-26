import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import Chat from "~/components/chat/Chat";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type CircleScreenProps = NativeStackScreenProps<RootStackParamList, "Circle">;

const CircleScreen = ({}: CircleScreenProps) => {
  return <Chat />;
};

export default CircleScreen;
