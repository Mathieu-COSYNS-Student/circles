import { registerRootComponent } from "expo";
import { preventAutoHideAsync } from "expo-splash-screen";
import messaging from "@react-native-firebase/messaging";

import App from "./App";

// eslint-disable-next-line @typescript-eslint/require-await
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

preventAutoHideAsync().catch(console.warn);
registerRootComponent(App);
