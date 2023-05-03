import React, { useId, type FC } from "react";
import {
  TextInput as DefaultTextInput,
  View,
  type TextInputProps as DefaultTextInputProps,
} from "react-native";

import { useThemeColors } from "~/hooks/Theme";
import Text from "./Text";

export type TextInputProps = DefaultTextInputProps & { label?: string };

const TextInput: FC<TextInputProps> = ({ label, className, ...props }) => {
  const { inputPlaceholder, inputCursor } = useThemeColors([
    "inputPlaceholder",
    "inputCursor",
  ]);
  const labelId = useId();

  return (
    <View className={className}>
      {label && (
        <Text nativeID={labelId} className="mb-2 ml-2 text-sm">
          {label}
        </Text>
      )}
      <DefaultTextInput
        className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
      focus:border-brand-500 focus:ring-brand-500  
      dark:border-zinc-700 dark:bg-zinc-800 dark:text-white
      dark:focus:border-brand-500 dark:focus:ring-brand-500`}
        accessibilityLabel={label}
        accessibilityLabelledBy={labelId}
        placeholderTextColor={inputPlaceholder}
        selectionColor={inputCursor}
        {...props}
      />
    </View>
  );
};

export default TextInput;
