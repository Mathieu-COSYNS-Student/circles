import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  Item,
  OverflowMenu,
  type HeaderButtonProps,
} from "react-navigation-header-buttons";

import { useThemeColors } from "~/hooks/Theme";
import CirclesScreen from "~/screens/CirclesScreen";
import TestScreen from "~/screens/TestScreen";
import { useRootNavigation } from "./useRootNavigation";

export type MainTabParamList = {
  Circles: undefined;
  Test: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const IoniconsHeaderButton = (props: HeaderButtonProps) => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const MainTabNavigator = () => {
  const navigation = useRootNavigation();
  const { tabIconDefault, tabIconSelected } = useThemeColors([
    "tabIconDefault",
    "tabIconSelected",
  ]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Circles":
              iconName = focused ? "people-circle" : "people-circle-outline";
              break;
            default:
              iconName = focused ? "help-circle" : "help-circle-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: tabIconSelected,
        tabBarInactiveTintColor: tabIconDefault,
      })}
    >
      <Tab.Screen
        name="Circles"
        component={CirclesScreen}
        options={{
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item
                title="create a new circle"
                iconName="chatbubbles"
                onPress={() => navigation.navigate("CreateCircle")}
              />
              <OverflowMenu
                OverflowIcon={({ color }) => (
                  <Ionicons
                    name="ellipsis-vertical"
                    size={23}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    color={color}
                  />
                )}
              >
                <HiddenItem
                  title="Account"
                  onPress={() => navigation.navigate("Account")}
                />
              </OverflowMenu>
            </HeaderButtons>
          ),
        }}
      />
      <Tab.Screen name="Test" component={TestScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
