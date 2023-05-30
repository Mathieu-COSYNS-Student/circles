import { SectionList, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { PermissionSettingItem } from "~/components/PermissionSettingItem";
import { ScreenContentContainer, Text } from "~/components/ui";
import {
  permissionsSettings,
  type PermissionSettingItem as PermissionSettingItemType,
} from "~/constants/PermissionsSettings";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type PermissionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Permissions"
>;

const _renderItem = ({ item }: { item: PermissionSettingItemType }) => {
  return <PermissionSettingItem permission={item} />;
};

export const PermissionsScreen = ({ route }: PermissionScreenProps) => {
  const { role, networkName } = route.params;

  return (
    <ScreenContentContainer
      contentClassName="p-0"
      hero={
        <View>
          <Text type="heading2">
            <Text type="brand">{role.name}</Text> configuration
          </Text>
          <Text type="heading3">
            in <Text type="brand">{networkName}</Text>
          </Text>
        </View>
      }
      heroBrand={false}
      scrollable={false}
    >
      <SectionList
        sections={permissionsSettings}
        renderSectionHeader={({ section: { category } }) => (
          <Text className="mx-2 mt-4 text-lg" faded={true}>
            {category}
          </Text>
        )}
        renderItem={_renderItem}
      />
    </ScreenContentContainer>
  );
};
