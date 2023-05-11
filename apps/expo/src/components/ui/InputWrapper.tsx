import React, { type FC, type ReactNode } from "react";
import { View } from "react-native";

import { useThemeColors } from "~/hooks/Theme";
import Text from "./Text";

export type TextWrapperProps = {
  labelId?: string;
  label?: string;
  hint?: string;
  touched?: boolean;
  errors?: string | string[];
  containerClassName?: string;
  children: ReactNode;
};

export const InputWrapper: FC<TextWrapperProps> = ({
  labelId,
  label,
  hint,
  touched,
  errors,
  containerClassName,
  children,
}) => {
  const { error } = useThemeColors(["error"]);
  return (
    <View className={containerClassName}>
      {label && (
        <Text nativeID={labelId} className="mb-2 ml-2">
          {label}
        </Text>
      )}
      {children}
      {touched &&
        errors &&
        (typeof errors === "string" ? (
          <Text style={{ color: error }} className="mx-3 mt-1 text-sm">
            {touched && errors}
          </Text>
        ) : (
          <>
            {errors.map((error) => (
              <Text
                key={error}
                style={{ color: error }}
                className="mx-3 mt-1 text-sm"
              >
                {error}
              </Text>
            ))}
          </>
        ))}
      {hint && (
        <Text className="mx-3 mt-1 text-sm text-gray-500 dark:text-zinc-400">
          {hint}
        </Text>
      )}
    </View>
  );
};
