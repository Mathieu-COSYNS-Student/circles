import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import Chat from "~/components/chat/Chat";
import { FullLoading } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type CircleScreenProps = NativeStackScreenProps<RootStackParamList, "Circle">;

const CircleScreen = ({ route }: CircleScreenProps) => {
  const { id } = route.params;

  const { data } = trpc.circles.get.useQuery(id);

  return data ? <Chat chatId={data.chatId} /> : <FullLoading />;
};

export default CircleScreen;
