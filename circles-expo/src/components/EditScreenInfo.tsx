import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.getStartedContainer}>
      <Text>{path}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});
