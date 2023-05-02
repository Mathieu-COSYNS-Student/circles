import { Platform } from "react-native";
import {
  Bubble,
  MessageText,
  type BubbleProps,
  type IMessage,
  type MessageTextProps,
} from "react-native-gifted-chat";

import { useThemeColor } from "../../hooks/Theme";
import TypingIndicator from "./TypingIndicator";

export const renderBubble = <TMessage extends IMessage>(
  props: BubbleProps<TMessage>,
) => {
  return <MyBubble {...props} />;
};

const MyBubble = <TMessage extends IMessage>(props: BubbleProps<TMessage>) => {
  const chatLeftBubbleBackgroundColor = useThemeColor(
    "chatLeftBubbleBackground",
  );
  const chatLeftBubbleBorderColor = useThemeColor("chatLeftBubbleBorder");
  const chatRightBubbleBackgroundColor = useThemeColor(
    "chatRightBubbleBackground",
  );
  const chatRightBubbleBorderColor = useThemeColor("chatRightBubbleBorder");

  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: chatLeftBubbleBackgroundColor,
          borderWidth: 0.5,
          borderColor: chatLeftBubbleBorderColor,
        },
        right: {
          backgroundColor: chatRightBubbleBackgroundColor,
          borderWidth: 0.5,
          borderColor: chatRightBubbleBorderColor,
        },
      }}
    />
  );
};

export const renderMessageText = <TMessage extends IMessage>(
  props: MessageTextProps<TMessage>,
) => {
  return <MyMessageText {...props} />;
};

const MyMessageText = <TMessage extends IMessage>(
  props: MessageTextProps<TMessage>,
) => {
  const chatLeftBubbleColor = useThemeColor("chatLeftBubble");
  const chatRightBubbleColor = useThemeColor("chatRightBubble");

  return (
    <MessageText
      {...props}
      textStyle={{
        left: {
          color: chatLeftBubbleColor,
          margin: 0,
        },
        right: {
          color: chatRightBubbleColor,
          margin: 0,
        },
      }}
      linkStyle={{
        left: { color: chatLeftBubbleColor },
        right: { color: chatRightBubbleColor },
      }}
      containerStyle={
        Platform.OS === "web"
          ? {
              left: {
                paddingHorizontal: 15,
                paddingVertical: 5,
              },
              right: {
                paddingHorizontal: 15,
                paddingVertical: 5,
              },
            }
          : {}
      }
    />
  );
};

export const renderFooter = (props?: { isTyping: boolean }) => {
  return <TypingIndicator isTyping={props?.isTyping || false} />;
};
