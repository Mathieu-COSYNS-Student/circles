import React, { type FC } from "react";
import { View } from "react-native";

import ActivityIndicator from "./ActivityIndicator";

const FullLoading: FC = () => {
  return (
    <View className="h-full w-full items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default FullLoading;
