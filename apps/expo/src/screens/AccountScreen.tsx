import { Image, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { Button, ScreenContentContainer, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, "Account">;

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { signOut } = useAuth();
  const { user } = useUser();
  const trpcContext = trpc.useContext();

  const onChangePasswordPress = () => {
    navigation.navigate("ChangePassword");
  };

  const onSignOutPress = async () => {
    await signOut();
    trpcContext.invalidate();
  };

  return (
    <ScreenContentContainer contentClassName="justify-between">
      <View className="mt-2 items-center">
        <Text className="mb-4" type="heading1">
          Profile
        </Text>
        <Image
          className="mb-1 aspect-square max-h-[150] w-2/4 max-w-[150] rounded-full"
          source={{ uri: user?.profileImageUrl }}
          alt={`${user?.fullName} profile picture`}
        />
        <Text className="mt-4" type="heading2">
          First name
        </Text>
        <Text className="text-center">{user?.firstName}</Text>
        <Text className="mt-2" type="heading2">
          Last name
        </Text>
        <Text className="mb-6 text-center">{user?.lastName}</Text>
      </View>

      <View>
        <View className="mb-2">
          <Button onPress={onChangePasswordPress} title="Change password" />
        </View>
        <Button variant="danger" onPress={onSignOutPress} title="Sign out" />
      </View>
    </ScreenContentContainer>
  );
}
