import { View } from "react-native";

import {
  Button,
  OrSeparator,
  ScreenContentContainer,
  Text,
} from "~/components/ui";
import { useRootNavigation } from "~/navigators/useRootNavigation";

export const HomeWelcome = () => {
  const navigation = useRootNavigation();
  return (
    <ScreenContentContainer hero="Welcome to Circles">
      <Text type="heading2">
        Start to use Circles by creating or joining a network.
      </Text>
      <Text className="mb-8 mt-1">
        A network brings together all the people who gravitate around someone.
        When you create your own network, you become the central figure. In a
        network, you build your community of caregivers, friends, family and
        other helpers.
      </Text>
      <View className="flex-grow justify-center">
        <Button
          title="Join a network"
          size="huge"
          onPress={() => {
            navigation.navigate("DrawerNavigator", { screen: "NetworkJoin" });
          }}
        />
        <OrSeparator />
        <Button
          title="Create your own network"
          size="huge"
          onPress={() => {
            navigation.navigate("DrawerNavigator", { screen: "NetworkCreate" });
          }}
        />
      </View>
    </ScreenContentContainer>
  );
};
