import { SignedOut, useUser } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

function AppStack() {
  const { isSignedIn } = useUser();

  if (isSignedIn) return <Redirect href="/" />;

  return (
    <SignedOut>
      <Stack>
        <Stack.Screen name="onboarding" options={{ title: 'Onboarding', headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign In', headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ title: 'Sign Up', headerShown: true }} />
      </Stack>
    </SignedOut>
  );
}

export default AppStack;
