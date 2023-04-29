import { useCallback, useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { hideAsync } from "expo-splash-screen";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import notifee from "@notifee/react-native";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { OverflowMenuProvider } from "react-navigation-header-buttons";

import { AuthProvider } from "~/utils/AuthProvider";
import { TRPCProvider } from "~/utils/trpc";
import { View, useThemeColor } from "~/components/Themed";
import { RootNavigator } from "~/navigators/RootNavigator";

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

  const { getToken } = useAuth();
  const { isLoaded: userLoaded } = useUser();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    const firebaseSignInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" });
      if (token) await auth().signInWithCustomToken(token);
    };

    firebaseSignInWithClerk().catch(() =>
      console.log("firebaseSignInWithClerk OK!"),
    );
  }, [getToken]);

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
    </View>
  ) : (
    <View />
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor("background");

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
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
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
        <NavigationContainer
          theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <OverflowMenuProvider>
            <RootNavigator />
          </OverflowMenuProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
