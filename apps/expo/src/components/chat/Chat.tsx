import { useEffect, useState } from "react";
import { GiftedChat, type IMessage } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";

import {
  renderActions,
  renderComposer,
  renderInputToolbar,
  renderSend,
} from "./InputToolbar";
import {
  renderBubble,
  renderFooter,
  renderMessageText,
} from "./MessageContainer";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);
    setTimeout(() => {
      setIsTyping(false);
    }, 5000);
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    for (const newMessage of newMessages) {
      firestore()
        .collection("chats")
        .doc("nHf3EwoqraQNUxIK2EMk")
        .collection("messages")
        .add({
          userId: newMessage.user._id,
          text: newMessage.text,
          createdAt: newMessage.createdAt,
        })
        .catch(() => console.log("Message Added"));
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .doc("nHf3EwoqraQNUxIK2EMk")
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((documentSnapshot) => {
        console.log("firebase chat messages read");
        setMessages(
          documentSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              _id: doc.id,
              user: {
                _id: data.userId,
              },
              text: data.text,
              createdAt: data.createdAt.toDate(),
            };
          }),
        );
      });

    return () => subscriber();
  }, []);

  useEffect(() => console.log(messages), [messages]);

  return (
    <GiftedChat
      isTyping={isTyping}
      messages={messages}
      onSend={onSend}
      user={{
        _id: "user_2NyBVbUsdM5KZnXC0O2cjH3h5JG",
        name: "Aaron",
        avatar: "https://placeimg.com/150/150/any",
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
