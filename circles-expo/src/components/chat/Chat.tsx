import { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import initialMessages from './messages';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputToolbar';
import { renderFooter, renderBubble, renderMessageText } from './MessageContainer';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages(initialMessages.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()));
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);
    setTimeout(() => {
      setIsTyping(false);
    }, 5000);
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <GiftedChat
      isTyping={isTyping}
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Aaron',
        avatar: 'https://placeimg.com/150/150/any',
      }}
      alwaysShowSend
      scrollToBottom
      renderUsernameOnMessage
      onPressAvatar={console.log}
      keyboardShouldPersistTaps="never"
      renderInputToolbar={renderInputToolbar}
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderBubble={renderBubble}
      renderMessageText={renderMessageText}
      renderFooter={renderFooter}
      // messagesContainerStyle={{ backgroundColor: 'indigo' }}
    />
  );
};

export default Chat;
