import { useColorScheme } from "react-native";
import { DefaultTheme, type Theme } from "@react-navigation/native";

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

export function useNavigationTheme(): Theme {
  const theme = useColorScheme() ?? "light";
  const { primary, background, card, text, border, notification } =
    useThemeColors([
      "primary",
      "background",
      "card",
      "text",
      "border",
      "notification",
    ]);
  return {
    dark: theme === "dark",
    colors: {
      primary: primary ?? DefaultTheme.colors.primary,
      background: background ?? DefaultTheme.colors.background,
      card: card ?? DefaultTheme.colors.card,
      text: text ?? DefaultTheme.colors.text,
      border: border ?? DefaultTheme.colors.border,
      notification: notification ?? DefaultTheme.colors.notification,
    },
  };
}
