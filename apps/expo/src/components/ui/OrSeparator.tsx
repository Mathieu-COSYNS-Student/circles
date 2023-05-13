import React from "react";
import { View } from "react-native";

import Text from "./Text";

export const OrSeparator = () => {
  return (
    <View className="my-3 flex flex-row items-center">
      <View className="flex-grow border-b border-b-brand-200"></View>
      <Text className="mx-1 pb-1">or</Text>
      <View className="h-0.5 flex-grow  border-b border-b-brand-200" />
    </View>
  );
};
