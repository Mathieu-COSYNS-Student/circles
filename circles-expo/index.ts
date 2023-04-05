import { registerRootComponent } from 'expo';
import App from './App';
import { preventAutoHideAsync } from 'expo-splash-screen';

preventAutoHideAsync().catch(console.warn);
registerRootComponent(App);
