import { useThemeColor, View } from '@components/Themed';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@utils/AuthProvider';
import { TRPCProvider } from '@utils/trpc';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '@navigators/root';
import { useFonts } from 'expo-font';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { hideAsync } from 'expo-splash-screen';

export default function RootLayout() {
  return (
    <AuthProvider>
      <LoadingOrNot />
    </AuthProvider>
  );
}

const LoadingOrNot = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontLoaded, fontError] = useFonts({
    ...FontAwesome.font,
  });

  const { isLoaded: userLoaded } = useUser();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    const prepare = async () => {
      if (fontLoaded && userLoaded) {
        setAppIsReady(true);
      }
    };
    prepare();
  }, [fontLoaded, userLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  return appIsReady ? (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <App />
    </View>
  ) : (
    <View />
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor('background');

  return (
    <TRPCProvider>
      <SafeAreaProvider style={{ backgroundColor }}>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
