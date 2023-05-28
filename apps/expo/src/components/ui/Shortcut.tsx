import { type FC } from "react";
import { Pressable, View, type PressableProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Avatar, type AvatarProps } from "./Avatar";
import { Text } from "./Text";

export type ShortcutProps = {
  text: string;
  onPress?: PressableProps["onPress"];
  numberOfLines?: number;
} & Partial<AvatarProps>;

export const Shortcut: FC<ShortcutProps> = ({
  text,
  onPress,
  numberOfLines = 1,
  ...avatar
}) => {
  const shortcutScale = useSharedValue(1);

  const shortcutStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(shortcutScale.value, {
            mass: 0.2,
            stiffness: 75,
            damping: 5,
          }),
        },
      ],
      opacity: withSpring(
        interpolate(shortcutScale.value, [0.9, 1], [0.7, 1]),
        { mass: 0.2, stiffness: 75, damping: 5 },
      ),
    }),
    [],
  );

  return (
    <Pressable
      onPressIn={() => {
        shortcutScale.value = 0.9;
      }}
      onPressOut={() => {
        shortcutScale.value = 1;
      }}
      onPress={onPress}
    >
      <Animated.View style={shortcutStyle}>
        <View className="w-20 px-1 py-2">
          <View className="mx-auto mb-1 w-4/5">
            <Avatar alt={text} {...avatar} />
          </View>
          <Text className="text-center text-sm" numberOfLines={numberOfLines}>
            {text}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
