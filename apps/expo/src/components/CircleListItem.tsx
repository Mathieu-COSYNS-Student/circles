import { Image, TouchableOpacity, View } from "react-native";

import { circleSchema, type Circle } from "@acme/schema";

import { Text } from "~/components/ui";
import { useRootNavigation } from "~/navigators/useRootNavigation";

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
    <TouchableOpacity
      className="border-b-2 border-zinc-200 dark:border-zinc-800"
      onPress={onPress}
    >
      <View className="flex-row items-center p-3">
        <Image
          className="mr-3 h-14 w-14 rounded-full"
          source={{ uri: circle.pictureUrl }}
          alt={`${circle.name} icon`}
        />
        <Text>{circle.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
