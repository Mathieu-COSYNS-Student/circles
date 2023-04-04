import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { TRPCProvider } from '@utils/trpc';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useThemeColor } from '@components/Themed';
import { AuthProvider } from '@utils/AuthProvider';
import { useUser } from '@clerk/clerk-expo';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <LoadingOrNot />
    </AuthProvider>
  );
}

const LoadingOrNot = () => {
  const [fontLoaded, fontError] = useFonts({
    ...FontAwesome.font,
  });

  const { isLoaded: userLoaded } = useUser();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  if (!fontLoaded || !userLoaded) return <SplashScreen />;

  return <RootLayoutNav />;
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor('background');

  return (
    <SafeAreaProvider style={{ backgroundColor }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <TRPCProvider>
          <Slot />
        </TRPCProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
