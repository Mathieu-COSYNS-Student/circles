import React, { type FC } from "react";
import { View } from "react-native";

import ActivityIndicator from "./ActivityIndicator";

export const FullLoading: FC = () => {
  return (
    <View className="flex-grow items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
