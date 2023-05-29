import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { NetworkContextProvider } from "~/contexts/NetworkContext";
import { NetworkCirclesScreen } from "~/screens/NetworkCirclesScreen";
import { NetworkMembersScreen } from "~/screens/NetworkMembersScreen";
import { NetworkRolesScreen } from "~/screens/NetworkRolesScreen";
import { type DrawerParamList } from "./DrawerNavigator";

export type NetworkSettingsParamList = {
  Circles: undefined;
  Members: undefined;
  Roles: undefined;
};

const Tab = createMaterialTopTabNavigator<NetworkSettingsParamList>();

type NetworkSettingsProps = NativeStackScreenProps<
  DrawerParamList,
  "NetworkSettings"
>;

export const NetworkSettingsNavigator = ({ route }: NetworkSettingsProps) => {
  return (
    <NetworkContextProvider
      id={route.params.network.id}
      name={route.params.network.name}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: "auto",
          },
        }}
      >
        <Tab.Screen name="Circles" component={NetworkCirclesScreen} />
        <Tab.Screen name="Members" component={NetworkMembersScreen} />
        <Tab.Screen name="Roles" component={NetworkRolesScreen} />
      </Tab.Navigator>
    </NetworkContextProvider>
  );
};
