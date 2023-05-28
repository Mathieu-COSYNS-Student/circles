import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { CirclesShortcuts } from "~/components/CirclesShortcuts";
import { ScreenContentContainer, Text } from "~/components/ui";
import { type MainTabParamList } from "~/navigators/MainTabNavigator";

type HomeScreenProps = NativeStackScreenProps<MainTabParamList, "Home">;

export const HomeScreen = ({}: HomeScreenProps) => {
  const circlesQuery = trpc.circles.getAll.useQuery();

  const onRefresh = () => {
    circlesQuery.refetch();
  };

  return (
    <ScreenContentContainer
      contentClassName="p-0"
      refreshing={circlesQuery.isRefetching}
      onRefresh={onRefresh}
    >
      <View className="h-full">
        <View>
          <CirclesShortcuts circles={circlesQuery.data} />
        </View>
        <View className="mt-24 flex-grow items-center">
          <Text>Nothing to show yet</Text>
        </View>
      </View>
    </ScreenContentContainer>
  );
};
