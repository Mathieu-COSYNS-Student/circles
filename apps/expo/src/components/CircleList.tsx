import { FlatList } from "react-native";

import { type Circle } from "@acme/schema";

import { RefreshControl, type RefreshControlProps } from "~/components/ui";
import { CirclesListItem } from "./CircleListItem";

const _renderItem = ({ item }: { item: Circle }) => {
  return <CirclesListItem circle={item} />;
};

export type CirclesListProps = {
  circles: Circle[];
} & Pick<RefreshControlProps, "onRefresh" | "refreshing">;

export const CirclesList = ({
  circles,
  refreshing,
  onRefresh,
}: CirclesListProps) => {
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={circles}
      renderItem={_renderItem}
    />
  );
};
