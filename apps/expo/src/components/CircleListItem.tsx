import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { circleSchema, type Circle } from "@acme/schema";

import { useRootNavigation } from "~/navigators/useRootNavigation";
import { Separator, Text, View } from "./Themed";

export const CirclesListItem = ({ circle }: { circle: Circle }) => {
  const navigation = useRootNavigation();

  const onPress = () => {
    navigation.navigate("Circle", { ...circle });
  };

  const result = circleSchema.safeParse(circle);
  if (!result.success) {
    console.log(result.error.message);
  }
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Image
            source={{ uri: circle.pictureUrl }}
            style={styles.image}
            alt={`${circle.name} icon`}
          />
          <Text>{circle.name}</Text>
        </View>
      </TouchableOpacity>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
});
