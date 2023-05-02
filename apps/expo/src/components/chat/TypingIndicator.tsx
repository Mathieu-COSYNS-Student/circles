import * as React from "react";
import { Animated, StyleSheet } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";

import { useThemeColor } from "~/hooks/Theme";
import { useUpdateLayoutEffect } from "~/hooks/useUpdateLayoutEffect";

interface Props {
  isTyping?: boolean;
}

const TypingIndicator = ({ isTyping }: Props) => {
  const chatLeftBubbleColor = useThemeColor("chatLeftBubble");
  const chatLeftBubbleBackgroundColor = useThemeColor(
    "chatLeftBubbleBackground",
  );
  const chatLeftBubbleBorderColor = useThemeColor("chatLeftBubbleBorder");

  const { yCoords, heightScale, marginScale } = React.useMemo(
    () => ({
      yCoords: new Animated.Value(200),
      heightScale: new Animated.Value(0),
      marginScale: new Animated.Value(0),
    }),
    [],
  );

  // on isTyping fire side effect
  useUpdateLayoutEffect(() => {
    if (isTyping) {
      slideIn();
    } else {
      slideOut();
    }
  }, [isTyping]);

  // side effect
  const slideIn = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 16,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // side effect
  const slideOut = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: yCoords,
            },
          ],
          height: heightScale,
          marginBottom: marginScale,
          backgroundColor: chatLeftBubbleBackgroundColor,
          borderColor: chatLeftBubbleBorderColor,
        },
      ]}
    >
      {isTyping && (
        <TypingAnimation
          dotRadius={4}
          dotMargin={5.5}
          dotColor={chatLeftBubbleColor}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    paddingLeft: 6,
    paddingTop: 7.2,
    width: 45,
    borderRadius: 15,
    borderWidth: 0.5,
  },
});

export default TypingIndicator;
