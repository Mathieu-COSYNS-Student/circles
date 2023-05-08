import React, { type FC } from "react";
import {
  Text as DefaultText,
  type TextProps as DefaultTextProps,
} from "react-native";

export type TextProps = DefaultTextProps & {
  type?: "normal" | "heading1" | "heading2" | "heading3" | "heading4" | "link";
};

const Text: FC<TextProps> = ({ className, type = "normal", ...props }) => {
  switch (type) {
    case "heading1":
      className += " text-4xl font-extrabold";
      break;
    case "heading2":
      className += " text-2xl font-semibold";
      break;
    case "heading3":
      className += " text-xl font-medium";
      break;
    case "heading4":
      className += " text-lg text-gray-800 dark:text-zinc-50";
      break;
    case "link":
      className +=
        " font-medium text-brand-600 dark:text-brand-400 hover:underline";
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
