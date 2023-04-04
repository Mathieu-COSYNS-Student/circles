import { SignedIn, useUser } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

function AppStack() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) return <Redirect href="/onboarding" />;

  return (
    <SignedIn>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Circles' }} />
        <Stack.Screen name="circles/[id]/index" options={{ title: 'Circles Messages' }} />
        <Stack.Screen name="circles/[id]/settings" options={{ title: 'Circles Messages Settings' }} />
        <Stack.Screen name="dev" options={{ headerShown: true }} />
      </Stack>
    </SignedIn>
  );
}

export default AppStack;
