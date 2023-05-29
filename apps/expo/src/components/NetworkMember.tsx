import { View } from "react-native";

import { type NetworkMember as NetworkMemberType } from "@acme/schema";

import { Avatar, Text } from "~/components/ui";

export const NetworkMember = ({ member }: { member: NetworkMemberType }) => {
  return (
    <View className="flex-row items-center">
      <View className="m-2 w-14">
        <Avatar
          alt={`${member.firstName} ${member.lastName}`}
          source={
            member.profileImageUrl ? { uri: member.profileImageUrl } : undefined
          }
        />
      </View>
      <View>
        <Text className="font-medium">{`${member.firstName} ${member.lastName}`}</Text>
        <View className="flex-row">
          {member.roles.map((role) => (
            <View
              key={role.id}
              className="rounded border border-brand-400 bg-brand-300 px-1 py-0.5 dark:border-brand-900"
            >
              <Text className="text-xs text-brand-800">{role.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
