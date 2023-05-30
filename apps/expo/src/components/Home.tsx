import { View } from "react-native";

import { trpc } from "~/utils/trpc";
import { CirclesShortcuts } from "~/components/CirclesShortcuts";
import { ScreenContentContainer } from "~/components/ui";

export const Home = () => {
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
          {/* <Text>Coming soon</Text> */}
        </View>
      </View>
    </ScreenContentContainer>
  );
};
