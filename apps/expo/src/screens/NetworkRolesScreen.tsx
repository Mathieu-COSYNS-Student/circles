import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type Role as RoleType } from "@acme/schema";

import { trpc } from "~/utils/trpc";
import { QueryDataFlatList } from "~/components/QueryDataFlatList";
import { Role } from "~/components/Role";
import { useNetworkContext } from "~/contexts/NetworkContext";
import { type NetworkSettingsParamList } from "~/navigators/NetworkSettingsNavigator";

type NetworkRolesScreenProps = NativeStackScreenProps<
  NetworkSettingsParamList,
  "Roles"
>;

const _renderItem = ({ item }: { item: RoleType }) => {
  return <Role role={item} />;
};

export const NetworkRolesScreen = ({}: NetworkRolesScreenProps) => {
  const { id } = useNetworkContext();

  const roleQuery = trpc.networks.getRoles.useQuery({ networkId: id });

  return <QueryDataFlatList query={roleQuery} renderItem={_renderItem} />;
};
