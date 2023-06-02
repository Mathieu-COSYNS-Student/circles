import { View, type PressableProps } from "react-native";

import { type NetworkMember as NetworkMemberType } from "@acme/schema";

import {
  Avatar,
  Checkbox,
  ListItem,
  Text,
  type CheckboxProps,
} from "~/components/ui";

export const NetworkMember = ({
  member,
  onPress,
  ...props
}: {
  member: NetworkMemberType;
  onPress?: PressableProps["onPress"];
} & CheckboxProps) => {
  return (
    <ListItem onPress={onPress}>
      <View className="flex-row items-center">
        <View className="m-2 w-14">
          <Avatar
            alt={`${member.firstName} ${member.lastName}`}
            source={
              member.profileImageUrl
                ? { uri: member.profileImageUrl }
                : undefined
            }
          />
        </View>
        <View className="flex-grow">
          <Text className="font-medium">{`${member.firstName} ${member.lastName}`}</Text>
          {!!member.roles.length && (
            <View className="flex-row">
              {member.roles.map((role) => (
                <View
                  key={role.id}
                  className="mr-0.5 rounded border border-brand-400 bg-brand-300 px-1 py-0.5 dark:border-brand-900"
                >
                  <Text className="text-xs text-brand-800">{role.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {typeof props.checked !== "undefined" && <Checkbox {...props} />}
      </View>
    </ListItem>
  );
};
