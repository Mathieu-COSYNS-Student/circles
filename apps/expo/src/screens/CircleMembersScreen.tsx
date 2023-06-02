import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { NetworkMember } from "~/components/NetworkMember";
import { QueryDataFlatList } from "~/components/QueryDataFlatList";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type CircleMembersScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CircleMembers"
>;

const _renderItem = ({
  item,
}: {
  item: {
    status: "INVITED" | "JOINED";
    role: "USER" | "ADMIN";
    user: {
      id: string;
      firstName: string;
      lastName: string;
      profileImageUrl: string;
    };
  };
}) => {
  return (
    <NetworkMember
      member={{
        ...item.user,
        roles: [
          {
            id: item.role,
            name: item.role,
          },
          {
            id: item.status,
            name: item.status,
          },
        ],
      }}
    />
  );
};

export const CircleMembersScreen = ({ route }: CircleMembersScreenProps) => {
  const { circleId } = route.params;
  const getMembersQuery = trpc.circles.getMembers.useQuery({
    id: circleId,
  });

  return <QueryDataFlatList query={getMembersQuery} renderItem={_renderItem} />;
};
