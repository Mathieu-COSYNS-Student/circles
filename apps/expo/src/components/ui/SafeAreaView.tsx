import React from "react";
import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SafeAreaViewProps = ViewProps;

export const SafeAreaView = ({ style, ...props }: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        style,
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
      {...props}
    />
  );
};
