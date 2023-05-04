import { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { parse, useURL } from "expo-linking";
import { hideAsync } from "expo-splash-screen";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { NavigationContainer } from "@react-navigation/native";
import { OverflowMenuProvider } from "react-navigation-header-buttons";

import { AuthProvider } from "~/utils/AuthProvider";
import { TRPCProvider } from "~/utils/trpc";
import { useNavigationTheme, useThemeColor } from "~/hooks/Theme";
import { RootNavigator } from "~/navigators/RootNavigator";

export default function RootLayout() {
  const url = useURL();

  useEffect(() => {
    console.log(url);
    if (url) {
      const { hostname, path, queryParams } = parse(url);
      console.log(hostname, path, queryParams);
    }
  }, [url]);

  return (
    <AuthProvider>
      <LoadingOrNot />
    </AuthProvider>
  );
}

const LoadingOrNot = () => {
  const statusBarStyle = useThemeColor("statusBarStyle");
  const navigationTheme = useNavigationTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontLoaded, fontError] = useFonts({
    ...Ionicons.font,
  });

  const { isLoaded: userLoaded } = useUser();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontLoaded && userLoaded) {
      setAppIsReady(true);
    }
  }, [fontLoaded, userLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  return appIsReady ? (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <App />
      <StatusBar
        barStyle={statusBarStyle as never}
        backgroundColor={navigationTheme.colors.card}
        translucent={true}
      />
    </View>
  ) : (
    <View />
  );
};

const App = () => {
  const navigationTheme = useNavigationTheme();
  const backgroundColor = useThemeColor("background");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "messages",
      name: "Messages",
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Notification Title",
      body: "Main body content of the notification",
      android: {
        channelId,
        pressAction: {
          id: "default",
        },
      },
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
      onDisplayNotification();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log(token);
    };
    getToken();

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification,
          );
        }
        setLoading(false);
      });
  }, []);

  return (
    <TRPCProvider>
      <SafeAreaProvider style={{ backgroundColor }}>
        <NavigationContainer theme={navigationTheme}>
          <OverflowMenuProvider>
            <RootNavigator />
          </OverflowMenuProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
