import { View } from "react-native";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { type NavigatorScreenParams } from "@react-navigation/native";

import { UserProfile } from "~/components/UserProfile";
import { Text } from "~/components/ui";
import { DrawerCheckboxItem } from "~/components/ui/DrawerCheckboxItem";
import { useNetworksContext } from "~/contexts/NetworksContext";
import MainTabNavigator, { type MainTabParamList } from "./MainTabNavigator";

export type DrawerParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { networks, activeNetworks, toggleNetwork, toggleAllNetworks } =
    useNetworksContext();

  return (
    <DrawerContentScrollView {...props}>
      <UserProfile />
      <Text className="m-3 mb-1">Filter Networks</Text>
      <DrawerCheckboxItem
        key="all"
        label="All Networks"
        checked={
          networks.length === activeNetworks.length
            ? true
            : activeNetworks.length === 0
            ? false
            : "intermediate"
        }
        onPress={() => toggleAllNetworks()}
      />
      <View className="ml-6">
        {networks.map(({ id, name, active }) => (
          <DrawerCheckboxItem
            key={id}
            label={name}
            checked={active}
            onPress={() => toggleNetwork(id)}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      backBehavior="none"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ title: "All Networks" }}
      />
    </Drawer.Navigator>
  );
};
