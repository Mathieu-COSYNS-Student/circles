import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from './root';

export const useRootNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
