import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import Colors from "~/constants/Colors";

type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(colorName: ColorName) {
  const theme = useColorScheme() ?? "light";
  return Colors[theme][colorName];
}

export function useThemeColors(colorsNames: ColorName[]) {
  const theme = useColorScheme() ?? "light";
  const result: Partial<Record<ColorName, string>> = {};
  for (const c of colorsNames) {
    result[c] = Colors[theme][c];
  }
  return result;
}

export function useNavigationTheme() {
  const theme = useColorScheme() ?? "light";
  return theme === "dark" ? DarkTheme : DefaultTheme;
}
