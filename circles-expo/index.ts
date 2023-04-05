import { registerRootComponent } from 'expo';
import App from './App';
import { preventAutoHideAsync } from 'expo-splash-screen';

preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});
registerRootComponent(App);
