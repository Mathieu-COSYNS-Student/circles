import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type NetworkMember as NetworkMemberType } from "@acme/schema";

import { trpc } from "~/utils/trpc";
import { NetworkMember } from "~/components/NetworkMember";
import { QueryDataFlatList } from "~/components/QueryDataFlatList";
import { useNetworkContext } from "~/contexts/NetworkContext";
import { type NetworkSettingsParamList } from "~/navigators/NetworkSettingsNavigator";

type NetworkMembersScreenProps = NativeStackScreenProps<
  NetworkSettingsParamList,
  "Members"
>;

const _renderItem = ({ item }: { item: NetworkMemberType }) => {
  return <NetworkMember member={item} />;
};

export const NetworkMembersScreen = ({}: NetworkMembersScreenProps) => {
  const { id } = useNetworkContext();

  const membersQuery = trpc.networks.getMembers.useQuery({ networkId: id });

  return <QueryDataFlatList query={membersQuery} renderItem={_renderItem} />;
};
