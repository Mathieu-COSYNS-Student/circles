import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
  useColorScheme,
} from "react-native";

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

export function Text(props: DefaultText["props"]) {
  const { style, ...otherProps } = props;
  const color = useThemeColor("text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: DefaultView["props"]) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor("background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#777",
  },
});
