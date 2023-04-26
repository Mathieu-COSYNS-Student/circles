import { useUser } from "@clerk/clerk-expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CircleScreen from "~/screens/CircleScreen";
import CircleSettingsScreen from "~/screens/CircleSettingsScreen";
import CirclesScreen from "~/screens/CirclesScreen";
import OnboardingScreen from "~/screens/OnboardingScreen";
import SignInScreen from "~/screens/SignInScreen";
import SignUpScreen from "~/screens/SignUpScreen";
import TestScreen from "~/screens/TestScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Circles: undefined;
  Circle: { id: string };
  CircleSettings: { id: string };
  Test: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Circles"
            component={CirclesScreen}
            options={{ title: "Circles" }}
          />
          <Stack.Screen
            name="Circle"
            component={CircleScreen}
            options={{ title: "Circles Messages" }}
          />
          <Stack.Screen
            name="CircleSettings"
            component={CircleSettingsScreen}
            options={{ title: "Circles Messages Settings" }}
          />
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
            options={{ title: "Sign Up", headerShown: true }}
          />
          <Stack.Screen name="Test" component={TestScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
