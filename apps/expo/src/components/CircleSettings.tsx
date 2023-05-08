import { useState, type FC } from "react";
import { View } from "react-native";

import { type ChatListObject } from "@acme/schema";

import { trpc } from "~/utils/trpc";
import { Button, Text } from "~/components/ui";
import { UpdateCircleNameForm } from "./forms/UpdateCircleNameForm";

export type CircleSettingsProps = { chat: ChatListObject };

export const CircleSettings: FC<CircleSettingsProps> = ({ chat }) => {
  const circleQuery = trpc.circles.get.useQuery({
    chatId: chat.id,
  });

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full">
      <Text className="mb-1 ml-2 mt-3" type="heading4">
        Customization
      </Text>
      <View className="mb-1">
        <Button title="Change name" onPress={() => setModalVisible(true)} />
      </View>
      {circleQuery.data && (
        <UpdateCircleNameForm
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          initialValues={{
            id: circleQuery.data.id,
            name: circleQuery.data.name,
          }}
          showName
        />
      )}
      {/* <View className="mb-1">
        <Button title="Change picture" />
      </View> */}
      <Text className="mb-1 ml-2 mt-3" type="heading4">
        Members
      </Text>
      <View className="mb-1">
        <Button title="See members" />
      </View>
      <Text className="mb-1 ml-2 mt-3" type="heading4">
        Danger zone
      </Text>
      <View className="mb-1">
        <Button variant="danger" title={`Leave ${chat.name}`} />
      </View>
      <View className="mb-1">
        <Button variant="danger" title={`Delete ${chat.name}`} />
      </View>
    </View>
  );
};
