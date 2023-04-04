import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  InputToolbarProps,
  IMessage,
  ActionsProps,
  ComposerProps,
  SendProps,
  GiftedChatProps,
} from 'react-native-gifted-chat';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useThemeColor } from '@components/Themed';
import { getLocationAsync, pickImageAsync, takePictureAsync } from '@utils/media';

export const renderInputToolbar = <TMessage extends IMessage>(props: InputToolbarProps<TMessage>) => {
  return <MyInputToolbar {...props} />;
};

export const MyInputToolbar = <TMessage extends IMessage>(props: InputToolbarProps<TMessage>) => {
  const backgroundColor = useThemeColor('chatToolbarBackgound');
  const borderColor = useThemeColor('chatToolbarBorder');
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor,
        paddingVertical: 5,
        borderTopWidth: 0.5,
        borderColor,
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );
};

export const renderActions = <TMessage extends IMessage>(
  props: ActionsProps & Pick<GiftedChatProps<TMessage>, 'onSend'>
) => {
  return <MyActions {...props} />;
};

export const MyActions = <TMessage extends IMessage>(
  props: ActionsProps & Pick<GiftedChatProps<TMessage>, 'onSend'>
) => {
  const color = useThemeColor('chatToolbarIcon');

  return (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => <FontAwesome size={30} name="plus" color={color} />}
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
              'Nothing to do yet': () => {},
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
  const color = useThemeColor('chatToolbarInput');
  const borderColor = useThemeColor('chatToolbarInputBorder');
  const backgroundColor = useThemeColor('chatToolbarInputBackgound');
  return (
    <Composer
      {...props}
      textInputStyle={{
        color,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        borderRadius: Platform.OS === 'web' ? 15 : 22,
        paddingVertical: 8.5,
        paddingHorizontal: 16,
        marginLeft: 0,
      }}
    />
  );
};

export const renderSend = <TMessage extends IMessage>(props: SendProps<TMessage>) => {
  return <MySend {...props} />;
};

export const MySend = <TMessage extends IMessage>(props: SendProps<TMessage>) => {
  const color = useThemeColor('chatToolbarIcon');
  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        opacity: props.text ? 1 : 0.5,
      }}
    >
      <MaterialIcons size={30} color={color} name={'send'} />
    </Send>
  );
};
