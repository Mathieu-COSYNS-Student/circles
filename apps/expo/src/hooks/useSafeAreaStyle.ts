import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeAreaStyle = () => {
  const insets = useSafeAreaInsets();

  return {
    flex: 1,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
};
