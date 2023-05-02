import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '@clerk/clerk-expo';

import CircleScreen from '@screens/CircleScreen';
import CirclesScreen from '@screens/CirclesScreen';
import CircleSettingsScreen from '@screens/CircleSettingsScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import SignInScreen from '@screens/SignInScreen';
import SignUpScreen from '@screens/SignUpScreen';
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen'
import ResetPasswordScreen from '@screens/ResetPasswordScreen'


export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Circles: undefined;
  Circle: { id: string };
  CircleSettings: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Circles" component={CirclesScreen} options={{ title: 'Circles' }} />
          <Stack.Screen name="Circle" component={CircleScreen} options={{ title: 'Circles Messages' }} />
          <Stack.Screen
            name="CircleSettings"
            component={CircleSettingsScreen}
            options={{ title: 'Circles Messages Settings' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ title: 'Onboarding', headerShown: false }}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In', headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up', headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'ForgotPassword', headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'ResetPassword', headerShown: false }} />


        </>
      )}
    </Stack.Navigator>
  );
};
