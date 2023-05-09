import { useUser } from "@clerk/clerk-expo";
import { type NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Item } from "react-navigation-header-buttons";

import { type ChatListObject } from "@acme/schema";

import { HeaderButtons } from "~/components/ui";
import AccountScreen from "~/screens/AccountScreen";
import ChangePasswordScreen from "~/screens/ChangePasswordScreen";
import { ChatScreen } from "~/screens/ChatScreen";
import { ChatSettingsScreen } from "~/screens/ChatSettingsScreen";
import CreateCircleScreen from "~/screens/CreateCircleScreen";
import ForgotPasswordScreen from "~/screens/ForgotPasswordScreen";
import { NetworkCreateOrJoinScreen } from "~/screens/NetworkCreateOrJoinScreen";
import { NetworkCreateScreen } from "~/screens/NetworkCreateScreen";
import { NetworkJoinScreen } from "~/screens/NetworkJoinScreen";
import OnboardingScreen from "~/screens/OnboardingScreen";
import ResetPasswordScreen from "~/screens/ResetPasswordScreen";
import SignInScreen from "~/screens/SignInScreen";
import SignUpScreen from "~/screens/SignUpScreen";
import TestScreen from "~/screens/TestScreen";
import { DrawerNavigator, type DrawerParamList } from "./DrawerNavigator";
import { useRootNavigation } from "./useRootNavigation";

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Circles: undefined;
  CreateCircle: undefined;
  Chat: ChatListObject;
  ChatSettings: ChatListObject;
  Test: undefined;
  Account: undefined;
  DrawerNavigator: NavigatorScreenParams<DrawerParamList>;
  ChangePassword: undefined;
  NetworkCreate: undefined;
  NetworkJoin: undefined;
  NetworkCreateOrJoin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isSignedIn } = useUser();
  const navigation = useRootNavigation();

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateCircle"
            component={CreateCircleScreen}
            options={{ title: "Create a new circle" }}
          />
          <Stack.Group>
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={({ route }) => ({
                headerBackTitleVisible: false,
                headerRight: () => (
                  <HeaderButtons fixStack>
                    <Item
                      title={`${route.params.name} settings`}
                      iconName="settings-outline"
                      onPress={() =>
                        navigation.navigate("ChatSettings", route.params)
                      }
                    />
                  </HeaderButtons>
                ),
              })}
            />
            <Stack.Screen
              name="ChatSettings"
              component={ChatSettingsScreen}
              options={{ title: "" }}
            />
          </Stack.Group>
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="NetworkCreateOrJoin"
            component={NetworkCreateOrJoinScreen}
          />
          <Stack.Screen
            name="NetworkCreate"
            component={NetworkCreateScreen}
            options={{ title: "" }}
          />
          <Stack.Screen name="NetworkJoin" component={NetworkJoinScreen} />
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
