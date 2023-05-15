import { useEffect, useMemo, useState } from "react";
import { Image, PixelRatio, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";

import { type ChatListObject } from "@acme/schema";

import { getRelativeTime } from "~/utils/date";
import {
  convertFirebaseDocumentToMessage,
  type Message,
} from "~/utils/messages";
import { Text } from "~/components/ui";
import { useThemeColors } from "~/hooks/Theme";
import { useRootNavigation } from "~/navigators/useRootNavigation";

export const ChatListItem = ({ chat }: { chat: ChatListObject }) => {
  const { text } = useThemeColors(["text"]);
  const dotIconSize = useMemo(() => PixelRatio.getFontScale() * 4, []);
  const navigation = useRootNavigation();
  const [lastMessage, setLastMessage] = useState<Message | undefined | false>(
    undefined,
  );

  const onPress = () => {
    navigation.navigate("Chat", { ...chat });
  };

  const { id } = chat;

  useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((documentSnapshot) => {
        if (!documentSnapshot) return;
        const docs = documentSnapshot.docs;

        if (docs.length > 0 && docs[0] !== undefined) {
          const doc = docs[0];
          const message = convertFirebaseDocumentToMessage(doc.id, doc.data());
          setLastMessage(message);
        } else {
          setLastMessage(false);
        }

        console.log("firebase chat messages read");
      });

    return () => subscriber();
  }, [id]);

  return (
    <TouchableOpacity
      className="border-b-2 border-gray-100 dark:border-zinc-950"
      onPress={onPress}
    >
      <View className="flex-row items-center p-3">
        <View className="w-1/6 pr-3">
          <Image
            className="w-100 aspect-square rounded-full"
            source={{ uri: chat.pictureUrl }}
            alt={`${chat.name} icon`}
          />
        </View>
        <View className="flex w-5/6 justify-evenly">
          <Text className="font-semibold" numberOfLines={1}>
            {chat.name}
          </Text>
          <View className="flex max-w-full flex-row items-center">
            {lastMessage ? (
              <>
                <Text className="flex-shrink" numberOfLines={1}>
                  {lastMessage?.text}
                </Text>
                <View className="mx-1 mt-1">
                  <Ionicons name="ellipse" size={dotIconSize} color={text} />
                </View>
                <Text>
                  {lastMessage?.createdAt &&
                    getRelativeTime(lastMessage.createdAt)}
                </Text>
              </>
            ) : (
              <Text numberOfLines={1}>
                {lastMessage === false ? "No messages yet. Say hello 👋" : ""}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
