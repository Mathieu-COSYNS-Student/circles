import { FlatList, type FlatListProps } from "react-native";

import { FullLoading } from "./FullLoading";
import RefreshControl from "./RefreshControl";
import { Text } from "./Text";

export type DataFlatListProps<Item> = {
  isLoading?: boolean;
  isRefreshing?: boolean;
  emptyText?: string;
} & FlatListProps<Item>;

export const DataFlatList = <Item,>({
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  emptyText,
  ...props
}: DataFlatListProps<Item>) => {
  if (isLoading) return <FullLoading />;
  return (
    <FlatList
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      ListEmptyComponent={
        emptyText ? (
          <Text className="mt-8 text-center">{emptyText}</Text>
        ) : undefined
      }
      {...props}
    />
  );
};
