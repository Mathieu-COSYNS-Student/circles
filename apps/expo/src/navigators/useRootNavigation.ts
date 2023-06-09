import { useNavigation, type NavigationProp } from "@react-navigation/native";

import type { RootStackParamList } from "./RootNavigator";

export const useRootNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
