import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { trpc } from '@utils/trpc';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useThemeColor } from '@components/Themed';
import SuperJSON from 'superjson';

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

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: 'http://192.168.1.62:4000/trpc',
        }),
      ],
    })
  );

  return (
    <SafeAreaProvider style={{ backgroundColor }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <AppStack />
          </QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Circles' }} />
      <Stack.Screen name="circles/[id]/index" options={{ title: 'Circles Messages' }} />
      <Stack.Screen name="circles/[id]/settings" options={{ title: 'Circles Messages Settings' }} />
      <Stack.Screen name="dev" options={{ headerShown: true }} />
    </Stack>
  );
}
