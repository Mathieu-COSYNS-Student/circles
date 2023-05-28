import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { type DrawerScreenProps } from "@react-navigation/drawer";

import { DrawerToggleButton } from "~/components/ui/DrawerToggleButton";
import { useThemeColors } from "~/hooks/Theme";
import { ChatsScreen } from "~/screens/MainTabNavigator/ChatsScreen";
import { HomeScreen } from "~/screens/MainTabNavigator/HomeScreen";
import { type DrawerParamList } from "./DrawerNavigator";

export type MainTabParamList = {
  Home: undefined;
  Chats: undefined;
  Tasks: undefined;
  Test: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

type MainTabNavigatorProps = DrawerScreenProps<DrawerParamList, "Main">;

const MainTabNavigator = ({}: MainTabNavigatorProps) => {
  const { text } = useThemeColors(["text"]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen name="Chats" component={ChatsScreen} />
      {/* <Tab.Screen name="Tasks" component={TasksScreen} /> */}
      {/* <Tab.Screen name="Test" component={TestScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
