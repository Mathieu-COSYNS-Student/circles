import { FlatList } from "react-native";

import { type Circle } from "@acme/schema";

import { CirclesListItem } from "./CircleListItem";

const _renderItem = ({ item }: { item: Circle }) => {
  return <CirclesListItem circle={item} />;
};

export interface CirclesListProps {
  circles: Circle[];
}

export const CirclesList = ({ circles }: CirclesListProps) => {
  return <FlatList data={circles} renderItem={_renderItem} />;
};
