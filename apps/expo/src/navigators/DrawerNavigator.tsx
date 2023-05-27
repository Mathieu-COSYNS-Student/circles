import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { type NavigatorScreenParams } from "@react-navigation/native";

import { UserProfile } from "~/components/UserProfile";
import { DrawerSeparator, Text } from "~/components/ui";
import { DrawerCheckboxItem } from "~/components/ui/DrawerCheckboxItem";
import { DrawerToggleButton } from "~/components/ui/DrawerToggleButton";
import { useNetworksContext } from "~/contexts/NetworksContext";
import { useThemeColors } from "~/hooks/Theme";
import { NetworkCreateScreen } from "~/screens/NetworkCreateScreen";
import { NetworkInviteScreen } from "~/screens/NetworkInviteScreen";
import { NetworkJoinScreen } from "~/screens/NetworkJoinScreen";
import MainTabNavigator, { type MainTabParamList } from "./MainTabNavigator";

export type DrawerParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  NetworkCreate: undefined;
  NetworkJoin: undefined;
  NetworkJoinScan: undefined;
  NetworkInvite: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {
    networks,
    activeNetworks,
    isNetworkOwner,
    toggleNetwork,
    toggleAllNetworks,
  } = useNetworksContext();

  const focusedRoute = props.state.routeNames[props.state.index];
  const subFocusedRoute =
    focusedRoute === "Main" &&
    props.state.routes[props.state.index]?.state?.index !== undefined
      ? props.state.routes[props.state.index]?.state?.routeNames?.[
          props.state.routes[props.state.index]?.state?.index || 0
        ]
      : undefined;

  return (
    <DrawerContentScrollView {...props}>
      <UserProfile />
      <DrawerSeparator />
      <DrawerItem
        label={"Home"}
        focused={subFocusedRoute === "Home"}
        onPress={() => {
          props.navigation.navigate("Main", { screen: "Home" });
        }}
      />
      <DrawerItem
        label={"Chats"}
        focused={subFocusedRoute === "Chats"}
        onPress={() => {
          props.navigation.navigate("Main", { screen: "Chats" });
        }}
      />
      <DrawerSeparator />
      <DrawerItem
        label={"Join a Network"}
        focused={focusedRoute === "NetworkJoin"}
        onPress={() => {
          props.navigation.navigate("NetworkJoin");
        }}
      />
      <DrawerItem
        label={"Invite someone in your Network"}
        focused={focusedRoute === "NetworkInvite"}
        onPress={() => {
          props.navigation.navigate("NetworkInvite");
        }}
      />
      {!isNetworkOwner && (
        <DrawerItem
          label={"Create your own Network"}
          focused={focusedRoute === "NetworkCreate"}
          onPress={() => {
            props.navigation.navigate("NetworkCreate");
          }}
        />
      )}
      <DrawerSeparator />
      {!!networks.length && (
        <>
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
        </>
      )}
    </DrawerContentScrollView>
  );
}

export const DrawerNavigator = () => {
  const { text } = useThemeColors();

  return (
    <Drawer.Navigator
      backBehavior="firstRoute"
      screenOptions={{
        headerLeft: ({ pressColor, pressOpacity, tintColor }) => {
          return (
            <DrawerToggleButton
              pressColor={pressColor}
              pressOpacity={pressOpacity}
              tintColor={tintColor ?? text}
              accessibilityLabel="Open Network Menu"
            />
          );
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ title: "", headerShown: false }}
      />
      <Drawer.Screen
        name="NetworkCreate"
        component={NetworkCreateScreen}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="NetworkInvite"
        component={NetworkInviteScreen}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="NetworkJoin"
        component={NetworkJoinScreen}
        options={{ title: "" }}
      />
    </Drawer.Navigator>
  );
};
