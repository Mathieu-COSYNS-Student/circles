import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItem } from "@react-navigation/drawer";
import Color from "color";

import { useThemeColors } from "~/hooks/Theme";

export type DrawerCheckboxItemProps = {
  key: string;
  label: string;
  checked: boolean | "intermediate";
  onPress: () => void;
};

export const DrawerCheckboxItem = ({
  label,
  checked,
  onPress,
}: DrawerCheckboxItemProps) => {
  const { primary, text } = useThemeColors(["primary", "text"]);

  return (
    <DrawerItem
      label={label}
      icon={({ size, color, focused }) => {
        return (
          <Ionicons
            name={
              focused
                ? checked !== "intermediate"
                  ? "checkmark-circle"
                  : "remove-circle"
                : "ellipse-outline"
            }
            color={focused ? primary : color}
            size={size}
          />
        );
      }}
      focused={!!checked}
      activeTintColor={Color(text).alpha(0.68).rgb().string()}
      activeBackgroundColor={Color(primary).alpha(0.12).rgb().string()}
      onPress={onPress}
    />
  );
};
