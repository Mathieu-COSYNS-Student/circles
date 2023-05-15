import React, { type FC } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button, Modal, Text } from "~/components/ui";
import { useThemeColors } from "~/hooks/Theme";
import { useRootNavigation } from "~/navigators/useRootNavigation";

export type NetworkJoinedModalProps = {
  visible: boolean;
};

export const NetworkJoinedModal: FC<NetworkJoinedModalProps> = ({
  visible,
}) => {
  const navigation = useRootNavigation();
  const { valid } = useThemeColors();

  const handleCloseJoined = () => {
    navigation.navigate("DrawerNavigator", {
      screen: "Main",
      params: { screen: "Home" },
    });
  };

  return (
    <Modal visible={visible}>
      <Text className="w-full pt-5 text-center">Network joined</Text>
      <View className="my-6">
        <Ionicons name="checkmark-circle-outline" color={valid} size={80} />
      </View>
      <Button title="Close" onPress={handleCloseJoined} />
    </Modal>
  );
};
