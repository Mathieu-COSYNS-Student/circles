import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { TRPCProvider } from '@utils/trpc';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useThemeColor } from '@components/Themed';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor('background');

  return (
    <SafeAreaProvider style={{ backgroundColor }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <TRPCProvider>
          <AppStack />
        </TRPCProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppStack() {
  return (
    <Stack>
      <Stack.Screen name="OnboardingScreen" options={{ title: 'Circles Onboarding', headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ title: 'Circles Login', headerShown: false }} />
      <Stack.Screen name="index" options={{ title: 'Circles' }} />
      <Stack.Screen name="circles/[id]/index" options={{ title: 'Circles Messages' }} />
      <Stack.Screen name="circles/[id]/settings" options={{ title: 'Circles Messages Settings' }} />
      <Stack.Screen name="dev" options={{ headerShown: true }} />
    </Stack>
  );
}
