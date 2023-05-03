import React, { type FC } from "react";
import {
  Text as DefaultText,
  type TextProps as DefaultTextProps,
} from "react-native";

export type TextProps = DefaultTextProps & {
  type?: "normal" | "heading1" | "heading2";
};

const Text: FC<TextProps> = ({ className, type = "normal", ...props }) => {
  switch (type) {
    case "heading1":
      className += " text-4xl font-extrabold";
      break;
    case "heading2":
      className += " text-2xl font-semibold";
      break;
  }
  return (
    <DefaultText
      className={`text-gray-900 dark:text-white ${className}`}
      {...props}
    />
  );
};

export default Text;
