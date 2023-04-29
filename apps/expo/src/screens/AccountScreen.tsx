import { Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text, View } from "~/components/Themed";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, "Account">;

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    await signOut();
  };

  return (
    <View>
      <Text>Account</Text>
      <Button title="Sign out" onPress={onSignOutPress} />
      <Button title="Test" onPress={() => navigation.navigate("Test")} />
    </View>
  );
}
