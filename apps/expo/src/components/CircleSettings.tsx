import { useState, type FC } from "react";
import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import { type ChatListObject } from "@acme/schema";

import { trpc } from "~/utils/trpc";
import { Button, Text } from "~/components/ui";
import { useRootNavigation } from "~/navigators/useRootNavigation";
import { UpdateCircleNameForm } from "./forms/UpdateCircleNameForm";

export type CircleSettingsProps = { chat: ChatListObject };

export const CircleSettings: FC<CircleSettingsProps> = ({ chat }) => {
  const navigation = useRootNavigation();
  const { user } = useUser();

  const circleQuery = trpc.circles.get.useQuery({
    chatId: chat.id,
  });
  const removeMembersMutation = trpc.circles.removeMembers.useMutation();
  const deleteCircleMutation = trpc.circles.delete.useMutation();

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
        <Button
          title="See members"
          onPress={() => {
            const circle = circleQuery.data;
            if (circle) {
              navigation.navigate("CircleMembers", {
                circleId: circleQuery.data.id,
                circleName: circleQuery.data.name,
              });
            }
          }}
        />
      </View>
      <Text className="mb-1 ml-2 mt-3" type="heading4">
        Danger zone
      </Text>
      <View className="mb-1">
        <Button
          variant="danger"
          title={`Leave ${chat.name}`}
          onPress={() => {
            const circle = circleQuery.data;
            if (circle) {
              removeMembersMutation.mutate({
                id: circle.id,
                members: user?.id ? [user.id] : [],
              });
              navigation.navigate("DrawerNavigator", {
                screen: "Main",
                params: { screen: "Chats" },
              });
            }
          }}
        />
      </View>
      <View className="mb-1">
        <Button
          variant="danger"
          title={`Delete ${chat.name}`}
          onPress={() => {
            const circle = circleQuery.data;
            if (circle) {
              deleteCircleMutation.mutate({
                id: circle.id,
              });
              navigation.navigate("DrawerNavigator", {
                screen: "Main",
                params: { screen: "Chats" },
              });
            }
          }}
        />
      </View>
    </View>
  );
};
