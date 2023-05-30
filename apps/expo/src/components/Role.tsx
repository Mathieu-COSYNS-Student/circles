import React from "react";
import { View } from "react-native";

import { type Role as RoleType } from "@acme/schema";

import { ListItem, Text } from "~/components/ui";
import { useNetworkContext } from "~/contexts/NetworkContext";
import { useRootNavigation } from "~/navigators/useRootNavigation";

export const Role = ({ role }: { role: RoleType }) => {
  const navigation = useRootNavigation();
  const { name: networkName } = useNetworkContext();

  return (
    <ListItem
      onPress={() => {
        navigation.navigate("Permissions", { role, networkName });
      }}
    >
      <View className="px-5 py-4">
        <Text>{role.name}</Text>
      </View>
    </ListItem>
  );
};
