import { useEffect, useState } from "react";
import { GiftedChat, type IMessage } from "react-native-gifted-chat";
import { useUser } from "@clerk/clerk-expo";
import firestore from "@react-native-firebase/firestore";

import {
  convertFirebaseDocumentToMessage,
  type Message,
} from "~/utils/messages";
import { trpc } from "~/utils/trpc";
import { renderComposer, renderInputToolbar, renderSend } from "./InputToolbar";
import {
  renderBubble,
  renderFooter,
  renderMessageText,
} from "./MessageContainer";

export interface ChatProps {
  chatId: string;
}

const Chat = ({ chatId }: ChatProps) => {
  const [loadingMessages, setLoadingMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [usersIds, setUsersIds] = useState<string[]>([]);
  const { user } = useUser();
  const { data: usersData } = trpc.users.getByIds.useQuery(usersIds);

  useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((documentSnapshot) => {
        if (!documentSnapshot) return;

        console.log("firebase chat messages read");
        const messages = documentSnapshot.docs.map((doc) => {
          return convertFirebaseDocumentToMessage(doc.id, doc.data());
        });
        setLoadingMessages(messages);
        setUsersIds(messages.map((message) => `${message.user._id}`));
      });

    return () => subscriber();
  }, [chatId]);

  useEffect(() => {
    setMessages(
      loadingMessages.map((message) => ({
        ...message,
        user: {
          _id: message.user._id,
          name: usersData ? usersData[message.user._id]?.username ?? "" : "",
          avatar: usersData
            ? usersData[message.user._id]?.profileImageUrl ?? ""
            : "",
        },
      })),
    );
  }, [loadingMessages, usersData]);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((messages) =>
      GiftedChat.append(
        messages,
        newMessages.map((newMessage) => ({ ...newMessage, pending: true })),
      ),
    );
    for (const newMessage of newMessages) {
      const newDoc = {
        userId: newMessage.user._id,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
      };
      firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(newDoc)
        .catch((e) => console.error(e));
    }
  };

  return (
    <GiftedChat
      isTyping={false}
      messages={messages}
      onSend={onSend}
      user={
        user
          ? {
              _id: user.id,
              name: user.username ?? "",
              avatar: user.profileImageUrl,
            }
          : undefined
      }
      alwaysShowSend
      scrollToBottom
      renderUsernameOnMessage
      onPressAvatar={console.log}
      keyboardShouldPersistTaps="never"
      renderInputToolbar={renderInputToolbar}
      // renderActions={renderActions}
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
