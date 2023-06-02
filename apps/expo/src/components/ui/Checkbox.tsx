import React, { type FC } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "~/hooks/Theme";

export type CheckboxProps = {
  checked?: boolean;
  size?: number;
};

export const Checkbox: FC<CheckboxProps> = ({ checked, size = 20 }) => {
  const { primary, text } = useThemeColors();
  return (
    <Ionicons
      name={checked ? "checkmark-circle" : "ellipse-outline"}
      color={checked ? primary : text}
      size={size}
    />
  );
};
