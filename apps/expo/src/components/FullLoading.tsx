import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { View } from "./Themed";

export default function FullLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
