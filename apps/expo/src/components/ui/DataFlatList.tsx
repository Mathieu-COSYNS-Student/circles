import { FlatList, View, type FlatListProps } from "react-native";

import ActivityIndicator from "./ActivityIndicator";
import RefreshControl from "./RefreshControl";

export type DataFlatListProps<Item> = {
  isLoading?: boolean;
  isRefreshing?: boolean;
} & FlatListProps<Item>;

export const DataFlatList = <Item,>({
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  ...props
}: DataFlatListProps<Item>) => {
  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <FlatList
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      {...props}
    />
  );
};
