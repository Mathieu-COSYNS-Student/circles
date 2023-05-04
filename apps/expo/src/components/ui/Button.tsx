import React, { type FC } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ButtonProps = Omit<
  PressableProps,
  "children" | "className" | "android_ripple"
> & {
  title: string;
  iconEnd?: keyof typeof Ionicons.glyphMap;
  type?: "normal" | "danger";
};

const Button: FC<ButtonProps> = ({
  title,
  iconEnd,
  type = "normal",
  ...props
}) => {
  let classForType = "";
  if (type === "normal") {
    classForType =
      "bg-brand-700 hover:bg-brand-800 focus:ring-brand-300 " +
      "dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-brand-800";
  }
  if (type === "danger") {
    classForType =
      "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800";
  }
  return (
    <View className="justify-center self-stretch rounded-lg">
      <Pressable
        className={`flex flex-row justify-center px-4 py-3 focus:outline-none focus:ring-4 ${classForType}`}
        android_ripple={{
          color: "rgba(0,0,0,0.15)",
          borderless: true,
        }}
        {...props}
      >
        <Text className="text-center text-sm font-semibold uppercase text-white">
          {title}
        </Text>
        {iconEnd && <Ionicons name={iconEnd} color="#fff" size={20} />}
      </Pressable>
    </View>
  );
};

export default Button;
