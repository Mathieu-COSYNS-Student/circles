import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HeaderButtons,
  HiddenItem,
  OverflowMenu,
} from "react-navigation-header-buttons";

import { useThemeColor } from "~/hooks/Theme";
import AccountScreen from "~/screens/AccountScreen";
import CircleScreen from "~/screens/CircleScreen";
import CircleSettingsScreen from "~/screens/CircleSettingsScreen";
import CirclesScreen from "~/screens/CirclesScreen";
import ForgotPasswordScreen from "~/screens/ForgotPasswordScreen";
import OnboardingScreen from "~/screens/OnboardingScreen";
import ResetPasswordScreen from "~/screens/ResetPasswordScreen";
import SignInScreen from "~/screens/SignInScreen";
import SignUpScreen from "~/screens/SignUpScreen";
import TestScreen from "~/screens/TestScreen";
import { useRootNavigation } from "./useRootNavigation";

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Circles: undefined;
  Circle: { id: string; name: string };
  CircleSettings: { id: string };
  Test: undefined;
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isSignedIn } = useUser();
  const statusBarStyle = useThemeColor("statusBarStyle");
  const navigation = useRootNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarStyle: statusBarStyle as never,
        statusBarTranslucent: true,
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Circles"
            component={CirclesScreen}
            options={{
              title: "Circles",
              headerRight: () => (
                <View
                  style={{
                    position: "relative",
                    right: -18,
                  }}
                >
                  <HeaderButtons>
                    <OverflowMenu
                      OverflowIcon={({ color }) => (
                        <MaterialIcons
                          name="more-vert"
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
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Circle"
            component={CircleScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen
            name="CircleSettings"
            component={CircleSettingsScreen}
            options={{ title: "Circles Messages Settings" }}
          />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ title: "Onboarding", headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: "Sign In", headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ title: "ForgotPassword", headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ title: "ResetPassword", headerShown: false }}
          />
          <Stack.Screen name="Test" component={TestScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
