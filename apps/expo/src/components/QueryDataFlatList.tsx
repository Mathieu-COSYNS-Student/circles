import { type UseTRPCQueryResult } from "@trpc/react-query/dist/shared";

import { DataFlatList, type DataFlatListProps } from "~/components/ui";

export type QueryDataFlatList<TDataItem, TError> = {
  query: UseTRPCQueryResult<ArrayLike<TDataItem>, TError>;
} & Omit<DataFlatListProps<TDataItem>, "data" | "isLoading" | "isRefreshing">;

export const QueryDataFlatList = <TDataItem, TError>({
  query,
  ...props
}: QueryDataFlatList<TDataItem, TError>) => {
  const onRefresh = () => {
    query.refetch();
  };

  return (
    <DataFlatList
      isLoading={query.isInitialLoading}
      isRefreshing={query.isRefetching}
      onRefresh={onRefresh}
      data={query.data}
      {...props}
    />
  );
};
