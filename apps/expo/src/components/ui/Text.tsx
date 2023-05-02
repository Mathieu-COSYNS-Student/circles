import React, { type FC } from "react";
import {
  Text as DefaultText,
  type TextProps as DefaultTextProps,
} from "react-native";

export type TextProps = DefaultTextProps;

const Text: FC<TextProps> = ({ className, ...props }) => {
  return <DefaultText className={`dark:text-white ${className}`} {...props} />;
};

export default Text;
