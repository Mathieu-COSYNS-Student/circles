import { Platform } from "react-native";
import {
  Actions,
  Composer,
  InputToolbar,
  Send,
  type ActionsProps,
  type ComposerProps,
  type GiftedChatProps,
  type IMessage,
  type InputToolbarProps,
  type SendProps,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor, useThemeColors } from "~/hooks/Theme";

export const renderInputToolbar = <TMessage extends IMessage>(
  props: InputToolbarProps<TMessage>,
) => {
  return <MyInputToolbar {...props} />;
};

export const MyInputToolbar = <TMessage extends IMessage>(
  props: InputToolbarProps<TMessage>,
) => {
  const backgroundColor = useThemeColor("chatToolbarBackground");
  const borderColor = useThemeColor("chatToolbarBorder");
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor,
        paddingVertical: 5,
        borderTopWidth: 0.5,
        borderTopColor: borderColor,
      }}
      primaryStyle={{ alignItems: "center" }}
    />
  );
};

export const renderActions = <TMessage extends IMessage>(
  props: ActionsProps & Pick<GiftedChatProps<TMessage>, "onSend">,
) => {
  return <MyActions {...props} />;
};

export const MyActions = <TMessage extends IMessage>(
  props: ActionsProps & Pick<GiftedChatProps<TMessage>, "onSend">,
) => {
  const color = useThemeColor("chatToolbarIcon");

  return (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
        //marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => <Ionicons size={38} name="add" color={color} />}
      options={
        props.onSend
          ? {
              // 'Choose A Picture From Library': async () => {
              //   console.log('Choose From Library');
              //   if (props.onSend) {
              //     const images = await pickImageAsync();
              //     if (images && images.length > 0) {
              //       //props.onSend([{ image }]);
              //     }
              //   }
              // },
              // 'Take Picture': async () => {
              //   console.log('Take Picture');
              //   if (props.onSend) {
              //     console.log(await takePictureAsync());
              //   }
              // },
              // 'Send Location': async () => {
              //   console.log('Send Location');
              //   if (props.onSend) {
              //     console.log(await getLocationAsync());
              //   }
              // },
              // Cancel: () => {
              //   console.log('Cancel');
              // },
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              "Nothing to do yet": () => {},
            }
          : {}
      }
      optionTintColor="#222B45"
    />
  );
};

export const renderComposer = (props: ComposerProps) => {
  return <MyComposer {...props} />;
};

export const MyComposer = (props: ComposerProps) => {
  const { text, inputBorder, inputBackground } = useThemeColors([
    "text",
    "inputBorder",
    "inputBackground",
  ]);
  return (
    <Composer
      {...props}
      textInputStyle={{
        color: text,
        backgroundColor: inputBackground,
        borderColor: inputBorder,
        borderWidth: 1,
        borderRadius: Platform.OS === "web" ? 15 : 22,
        paddingVertical: 8.5,
        paddingHorizontal: 16,
        marginLeft: 8,
      }}
    />
  );
};

export const renderSend = <TMessage extends IMessage>(
  props: SendProps<TMessage>,
) => {
  return <MySend {...props} />;
};

export const MySend = <TMessage extends IMessage>(
  props: SendProps<TMessage>,
) => {
  const color = useThemeColor("chatToolbarIcon");
  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
        opacity: props.text ? 1 : 0.5,
      }}
    >
      <Ionicons size={30} color={color} name="send" />
    </Send>
  );
};
