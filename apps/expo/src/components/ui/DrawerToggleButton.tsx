import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { type DrawerNavigationProp } from "@react-navigation/drawer";
import { PlatformPressable } from "@react-navigation/elements";
import {
  DrawerActions,
  useNavigation,
  type ParamListBase,
} from "@react-navigation/native";

type Props = {
  accessibilityLabel?: string;
  pressColor?: string;
  pressOpacity?: number;
  tintColor?: string;
};

export function DrawerToggleButton({ tintColor, ...rest }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <PlatformPressable
      {...rest}
      accessible
      accessibilityRole="button"
      android_ripple={{ borderless: true }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.touchable}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
    >
      <Ionicons style={[styles.icon]} name="menu" size={24} color={tintColor} />
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 3,
  },
  touchable: {
    marginHorizontal: 11,
  },
});
