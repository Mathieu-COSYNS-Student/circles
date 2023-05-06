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

import { ChatsScreen } from "~/screens/MainTabNavigator/ChatsScreen";
import { HomeScreen } from "~/screens/MainTabNavigator/HomeScreen";
import { TasksScreen } from "~/screens/MainTabNavigator/TasksScreen";
import TestScreen from "~/screens/TestScreen";
import { useRootNavigation } from "./useRootNavigation";

export type MainTabParamList = {
  Home: undefined;
  Chats: undefined;
  Tasks: undefined;
  Test: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const IoniconsHeaderButton = (props: HeaderButtonProps) => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const MainTabNavigator = () => {
  const navigation = useRootNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Chats":
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              break;
            case "Tasks":
              iconName = focused ? "checkbox" : "checkbox-outline";
              break;
            default:
              iconName = focused ? "help-circle" : "help-circle-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
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
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
