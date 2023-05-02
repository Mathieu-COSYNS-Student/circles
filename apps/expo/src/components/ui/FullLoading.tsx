import React, { type FC } from "react";
import { ActivityIndicator, View } from "react-native";

import { brandColors } from "~/constants/Colors";

const FullLoading: FC = () => {
  return (
    <View className="h-full w-full items-center justify-center">
      <ActivityIndicator color={brandColors[700]} size="large" />
    </View>
  );
};

export default FullLoading;
