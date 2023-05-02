import { Image, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, "Account">;

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { signOut } = useAuth();
  const { user } = useUser();

  const onSignOutPress = async () => {
    await signOut();
  };

  return (
    <View className="h-full justify-between p-2">
      <View className="mt-2 items-center">
        <Text className="mb-4 text-4xl font-extrabold">Profile</Text>
        <Image
          className="mb-1 aspect-square max-h-[150] w-2/4 max-w-[150] rounded-full"
          source={{ uri: user?.profileImageUrl }}
          alt={`${user?.fullName} profile picture`}
        />
        <Text>@{user?.username}</Text>
        <Text className="font-blod mt-8 text-2xl">First name</Text>
        <Text>{user?.firstName}</Text>
        <Text className="font-blod mt-2 text-2xl">Last name</Text>
        <Text>{user?.lastName}</Text>
      </View>

      <View>
        <View className="mb-2">
          <Button type="danger" onPress={onSignOutPress}>
            Sign out
          </Button>
        </View>
        <Button onPress={() => navigation.navigate("Test")}>Test</Button>
      </View>
    </View>
  );
}
