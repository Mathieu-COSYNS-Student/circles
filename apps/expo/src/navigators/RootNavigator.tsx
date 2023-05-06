import { useUser } from "@clerk/clerk-expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { type ChatListObject } from "@acme/schema";

import { renderChatHeaderTitle } from "~/components/chat/ChatHeaderTitle";
import AccountScreen from "~/screens/AccountScreen";
import ChangePasswordScreen from "~/screens/ChangePasswordScreen";
import { ChatScreen } from "~/screens/ChatScreen";
import CircleSettingsScreen from "~/screens/CircleSettingsScreen";
import CreateCircleScreen from "~/screens/CreateCircleScreen";
import ForgotPasswordScreen from "~/screens/ForgotPasswordScreen";
import OnboardingScreen from "~/screens/OnboardingScreen";
import ResetPasswordScreen from "~/screens/ResetPasswordScreen";
import SignInScreen from "~/screens/SignInScreen";
import SignUpScreen from "~/screens/SignUpScreen";
import TestScreen from "~/screens/TestScreen";
import MainTabNavigator from "./MainTabNavigator";

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Circles: undefined;
  CreateCircle: undefined;
  Chat: ChatListObject;
  CircleSettings: { id: string };
  Test: undefined;
  Account: undefined;
  MainTabNavigator: undefined;
  ChangePassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateCircle"
            component={CreateCircleScreen}
            options={{ title: "Create a new circle" }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
              headerTitle: renderChatHeaderTitle(route),
            })}
          />
          <Stack.Screen
            name="CircleSettings"
            component={CircleSettingsScreen}
            options={{ title: "Circles Messages Settings" }}
          />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
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
