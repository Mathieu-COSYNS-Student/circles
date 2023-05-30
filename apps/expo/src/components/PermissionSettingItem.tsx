import { View } from "react-native";

import { ListItem, Switch, Text, type SwitchProps } from "~/components/ui";
import { type PermissionSettingItem as PermissionSettingItemType } from "~/constants/PermissionsSettings";

export const PermissionSettingItem = ({
  permission,
  value,
  onValueChange,
}: {
  permission: PermissionSettingItemType;
} & Pick<SwitchProps, "value" | "onValueChange">) => {
  return (
    <ListItem>
      <View className="mx-2 flex-row items-center py-2">
        <View className="mx-2 flex-grow">
          <Text type="heading4">{permission.name}</Text>
          <Text className="text-xs" faded={true}>
            {value ? "Enabled" : "Disabled"}:{" "}
            {value ? permission.enabledTips : permission.disabledTips}
          </Text>
        </View>
        <Switch onValueChange={onValueChange} value={value} />
      </View>
    </ListItem>
  );
};
