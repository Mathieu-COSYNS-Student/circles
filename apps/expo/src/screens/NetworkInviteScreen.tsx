import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { Button, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type NetworkInviteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkInvite"
>;

export const NetworkInviteScreen = ({}: NetworkInviteScreenProps) => {
  const networkInviteMutation = trpc.networks.createInvite.useMutation();

  const invite = async () => {
    const result = await networkInviteMutation.mutateAsync({
      networkId: "645a5a8ea997505c2b0e6219",
    });
    console.log(result);
  };

  return (
    <View className="p-2">
      <Text type="heading1">Invite in your network</Text>
      <View className="mb-2">
        <Button onPress={invite} title="Invite" />
      </View>
    </View>
  );
};
