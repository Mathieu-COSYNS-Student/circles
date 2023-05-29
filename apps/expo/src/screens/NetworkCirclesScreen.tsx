import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { QueryDataFlatList } from "~/components/QueryDataFlatList";
import { Avatar, Text } from "~/components/ui";
import { useNetworkContext } from "~/contexts/NetworkContext";
import { type NetworkSettingsParamList } from "~/navigators/NetworkSettingsNavigator";

type NetworkCirclesScreenProps = NativeStackScreenProps<
  NetworkSettingsParamList,
  "Circles"
>;

export const NetworkCirclesScreen = ({}: NetworkCirclesScreenProps) => {
  const { id } = useNetworkContext();

  const circlesQuery = trpc.networks.getCircles.useQuery({ networkId: id });

  return (
    <QueryDataFlatList
      query={circlesQuery}
      renderItem={({ item }) => {
        return (
          <View className="flex-row items-center">
            <View className="m-2 w-14">
              <Avatar
                alt={`${item.name}`}
                source={item.pictureUrl ? { uri: item.pictureUrl } : undefined}
              />
            </View>
            <View>
              <Text className="font-medium">{`${item.name}`}</Text>
              <View className="rounded border border-brand-400 bg-brand-300 px-1 py-0.5 dark:border-brand-900">
                <Text className="text-xs text-brand-800">
                  {item.membersCount} member(s)
                </Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};
