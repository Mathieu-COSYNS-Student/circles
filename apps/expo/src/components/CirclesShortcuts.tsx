import { FlatList } from "react-native";

import { NETWORK_CIRCLES } from "@acme/accesscontrol";
import { type Circle } from "@acme/schema";

import { Shortcut } from "~/components/ui";
import { usePermissionContext } from "~/contexts/PermissionContext";
import { useThemeColors } from "~/hooks/Theme";
import { useRootNavigation } from "~/navigators/useRootNavigation";
import { CircleShortcut } from "./CircleShortcut";

const _renderItem = ({ item }: { item: Circle }) => {
  return <CircleShortcut circle={item} />;
};

export const CirclesShortcuts = ({ circles }: { circles?: Circle[] }) => {
  const navigation = useRootNavigation();
  const { neutral } = useThemeColors();
  const { ac } = usePermissionContext();

  return (
    <FlatList
      className="w-full"
      data={circles}
      horizontal={true}
      renderItem={_renderItem}
      ListHeaderComponent={
        ac?.create(NETWORK_CIRCLES) ? (
          <Shortcut
            text="Create circle"
            source="add-outline"
            backgroundColor={neutral}
            numberOfLines={2}
            onPress={() => {
              navigation.navigate("CreateCircle");
            }}
          />
        ) : undefined
      }
    />
  );
};
