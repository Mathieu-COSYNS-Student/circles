import { type ReactNode } from "react";
import { Pressable, View, type PressableProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const ListItem = ({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress?: PressableProps["onPress"];
}) => {
  const listItemScale = useSharedValue(1);

  const listItemStyle = useAnimatedStyle(
    () => ({
      // transform: [
      //   {
      //     scale: withSpring(listItemScale.value, {
      //       mass: 0.2,
      //       stiffness: 75,
      //       damping: 5,
      //     }),
      //   },
      // ],
      opacity: withSpring(
        interpolate(listItemScale.value, [0.9, 1], [0.5, 1]),
        { mass: 0.2, stiffness: 75, damping: 2 },
      ),
    }),
    [],
  );

  return (
    <View className="border-b border-gray-100 dark:border-zinc-900">
      {onPress ? (
        <Pressable
          onPressIn={() => {
            listItemScale.value = 0.9;
          }}
          onPressOut={() => {
            listItemScale.value = 1;
          }}
          onPress={onPress}
        >
          <Animated.View style={listItemStyle}>{children}</Animated.View>
        </Pressable>
      ) : (
        <Animated.View style={listItemStyle}>{children}</Animated.View>
      )}
    </View>
  );
};
