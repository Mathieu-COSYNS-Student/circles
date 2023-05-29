import React from "react";
import { View } from "react-native";

import { type Role as RoleType } from "@acme/schema";

import { Text } from "~/components/ui";

export const Role = ({ role }: { role: RoleType }) => {
  return (
    <View className="px-5 py-4">
      <Text>{role.name}</Text>
    </View>
  );
};
