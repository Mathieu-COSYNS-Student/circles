import React, { useMemo, type FC } from "react";
import {
  PixelRatio,
  Pressable,
  Text,
  View,
  type PressableProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "~/hooks/Theme";
import ActivityIndicator from "./ActivityIndicator";

export type ButtonProps = Omit<
  PressableProps,
  "children" | "className" | "android_ripple"
> & {
  title: string;
  iconStart?: keyof typeof Ionicons.glyphMap;
  iconEnd?: keyof typeof Ionicons.glyphMap;
  variant?: "normal" | "normal-outline" | "neutral" | "danger";
  rounded?: boolean;
  size?: "normal" | "huge";
  isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({
  title,
  iconStart,
  iconEnd,
  variant = "normal",
  rounded = false,
  size = "normal",
  isLoading,
  ...props
}) => {
  const { text, primary } = useThemeColors();
  let pressableClass = "";
  let textColor = "#fff";
  let useBorder = false;
  if (variant === "normal") {
    pressableClass =
      "bg-brand-700 hover:bg-brand-800 focus:ring-brand-300 " +
      "dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-brand-800";
  }
  if (variant === "normal-outline") {
    pressableClass =
      "border border-brand-700 hover:border-brand-800 focus:ring-brand-300 " +
      "dark:border-brand-600 dark:hover:border-brand-700 dark:focus:ring-brand-800";
    textColor = primary ?? "";
    useBorder = true;
  }
  if (variant === "neutral") {
    pressableClass =
      "bg-gray-200 hover:bg-gray-300 focus:ring-gray-300 " +
      "dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700";
    textColor = text ?? "";
  }
  if (variant === "danger") {
    pressableClass =
      "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800";
  }

  const iconSize = useMemo(
    () => PixelRatio.getFontScale() * (size === "huge" ? 34 : 17),
    [size],
  );
  return (
    <View
      className={`justify-center ${rounded ? "rounded-full" : "rounded-lg"}`}
    >
      <Pressable
        className={`flex flex-row items-center justify-center ${
          rounded ? "rounded-full" : "rounded-lg"
        } ${
          size === "huge" ? "px-7 py-4" : "px-4 py-3"
        } focus:outline-none focus:ring-4 ${pressableClass}`}
        android_ripple={{
          color: "rgba(0,0,0,0.15)",
          borderless: true,
        }}
        {...props}
        disabled={isLoading || props.disabled}
      >
        {!isLoading && iconStart && (
          <Ionicons
            style={{ marginRight: 4 }}
            name={iconStart}
            color={textColor}
            size={iconSize}
          />
        )}
        <Text
          className={`${useBorder ? "" : "m-[1px] "}text-center ${
            size === "huge" ? "text-lg" : "text-sm"
          } font-semibold uppercase ${isLoading ? "opacity-0" : ""}`}
          style={{
            color: textColor,
          }}
        >
          {title}
        </Text>
        {isLoading && (
          <View className="absolute">
            <ActivityIndicator color={textColor} />
          </View>
        )}
        {!isLoading && iconEnd && (
          <Ionicons
            style={{ marginLeft: 4 }}
            name={iconEnd}
            color={textColor}
            size={iconSize}
          />
        )}
      </Pressable>
    </View>
  );
};

export default Button;
