import React, { useMemo, type FC } from "react";
import {
  PixelRatio,
  Pressable,
  Text,
  View,
  type PressableProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ActivityIndicator from "./ActivityIndicator";

export type ButtonProps = Omit<
  PressableProps,
  "children" | "className" | "android_ripple"
> & {
  title: string;
  iconEnd?: keyof typeof Ionicons.glyphMap | "loading";
  variant?: "normal" | "normal-outline" | "danger";
};

const Button: FC<ButtonProps> = ({
  title,
  iconEnd,
  variant = "normal",
  ...props
}) => {
  let pressableClass = "";
  let textClass = "";
  let useBorder = false;
  if (variant === "normal") {
    pressableClass =
      "bg-brand-700 hover:bg-brand-800 focus:ring-brand-300 " +
      "dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-brand-800";
    textClass = "text-white";
  }
  if (variant === "normal-outline") {
    pressableClass =
      "border border-brand-700 hover:border-brand-800 focus:ring-brand-300 " +
      "dark:border-brand-600 dark:hover:border-brand-700 dark:focus:ring-brand-800";
    textClass = "text-brand-700 dark:text-brand-600";
    useBorder = true;
  }
  if (variant === "danger") {
    pressableClass =
      "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800";
    textClass = "text-white";
  }

  const iconSize = useMemo(() => PixelRatio.getFontScale() * 17, []);
  return (
    <View className="justify-center self-stretch rounded-lg">
      <Pressable
        className={`flex flex-row justify-center rounded-lg px-4 py-3 focus:outline-none focus:ring-4 ${pressableClass}`}
        android_ripple={{
          color: "rgba(0,0,0,0.15)",
          borderless: true,
        }}
        {...props}
      >
        <Text
          className={`${
            useBorder ? "" : "m-[1px] "
          }text-center text-sm font-semibold uppercase ${textClass}`}
        >
          {title}
        </Text>
        {iconEnd && (
          <>
            {iconEnd === "loading" ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Ionicons name={iconEnd} color="#fff" size={iconSize} />
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
