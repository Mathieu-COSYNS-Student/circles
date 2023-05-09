import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type NetworkCreateOrJoinScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkCreateOrJoin"
>;

export const NetworkCreateOrJoinScreen = ({
  navigation,
}: NetworkCreateOrJoinScreenProps) => {
  return (
    <View className="h-full justify-center p-2">
      <Button
        title="Create a network"
        onPress={() => navigation.navigate("NetworkCreate")}
      />
      <View className="mt-2">
        <Button
          title="Join a network"
          onPress={() => navigation.navigate("NetworkJoin")}
        />
      </View>
    </View>
  );
};
