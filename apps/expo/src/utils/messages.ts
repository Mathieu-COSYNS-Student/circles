import { type IMessage } from "react-native-gifted-chat";
import { type FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Message = IMessage;

export const convertFirebaseDocumentToMessage = (
  id: string,
  data: FirebaseFirestoreTypes.DocumentData,
  options?: {
    rawDate: boolean;
  },
): Message => {
  return {
    _id: id,
    user: {
      _id: data.userId as string,
    },
    text: data.text as string,
    createdAt: options?.rawDate
      ? (data.createdAt as Date)
      : (data.createdAt as FirebaseFirestoreTypes.Timestamp).toDate(),
    sent: true,
  };
};
