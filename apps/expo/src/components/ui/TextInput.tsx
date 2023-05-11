import React, { useId, useState, type FC, type ReactNode } from "react";
import {
  TextInput as DefaultTextInput,
  Pressable,
  View,
  type TextInputProps as DefaultTextInputProps,
  type PressableProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "~/hooks/Theme";
import { InputWrapper, type TextWrapperProps } from "./InputWrapper";

export type TextInputProps = Omit<DefaultTextInputProps, "className"> &
  Omit<TextWrapperProps, "labelId" | "children"> & {
    type?: "text" | "password";
    variant?: "normal" | "modal";
    iconStart?: keyof typeof Ionicons.glyphMap;
  };

export const TextInput: FC<TextInputProps> = ({
  type = "text",
  variant = "normal",
  label,
  hint,
  touched,
  errors,
  iconStart,
  containerClassName,
  ...props
}) => {
  const { text, inputPlaceholder, inputCursor, error, valid } = useThemeColors([
    "inputPlaceholder",
    "inputCursor",
    "text",
    "error",
    "valid",
  ]);
  const labelId = useId();
  const [hidden, setHidden] = useState(true);

  let iconStatus: keyof typeof Ionicons.glyphMap | undefined = undefined;
  let iconStatusColor = text;

  if (touched && !errors) {
    iconStatus = "checkmark-circle-outline";
    iconStatusColor = valid;
  } else if (touched && errors) {
    iconStatus = "alert-circle-outline";
    iconStatusColor = error;
  }

  const onPressEye = () => {
    setHidden((hidden) => !hidden);
  };

  let passwordProps = {};

  if (type === "password") {
    passwordProps = {
      autoCapitalize: "none",
      autoComplete: "password",
      autoCorrect: false,
      secureTextEntry: hidden,
    };
  }

  return (
    <InputWrapper
      containerClassName={containerClassName}
      labelId={labelId}
      label={label}
      hint={hint}
      touched={touched}
      errors={errors}
    >
      <View
        className={`flex w-full flex-row items-center overflow-hidden rounded-lg
        border border-gray-300 bg-gray-50
        focus:border-brand-500 focus:ring-brand-500
        ${
          variant === "modal"
            ? "dark:border-zinc-600 dark:bg-zinc-800"
            : "dark:border-zinc-800 dark:bg-zinc-900"
        }
      dark:focus:border-brand-500 dark:focus:ring-brand-500`}
      >
        {iconStart && (
          <IconContainer className="p-2.5 pr-0">
            <Ionicons name={iconStart} color={text} size={20} />
          </IconContainer>
        )}
        <DefaultTextInput
          className="w-0 flex-grow p-2.5 text-sm text-gray-900 dark:text-white"
          accessibilityLabel={label}
          accessibilityLabelledBy={labelId}
          placeholderTextColor={inputPlaceholder}
          selectionColor={inputCursor}
          {...props}
          {...passwordProps}
        />
        {iconStatus && (
          <View className="p-2.5 pl-0">
            <Ionicons name={iconStatus} color={iconStatusColor} size={20} />
          </View>
        )}
        {type === "password" && (
          <IconContainer className="p-2.5 pl-0" onPress={onPressEye}>
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              color={text}
              size={20}
            />
          </IconContainer>
        )}
      </View>
    </InputWrapper>
  );
};

const IconContainer = ({
  onPress,
  ...props
}: {
  className?: string;
  onPress?: PressableProps["onPress"];
  children: ReactNode;
}) => {
  if (onPress) {
    return <Pressable onPress={onPress} {...props} />;
  }
  return <View {...props} />;
};
