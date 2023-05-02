import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { CirclesList } from "~/components/CircleList";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type CirclesScreenProps = NativeStackScreenProps<RootStackParamList, "Circles">;

const CirclesScreen = ({}: CirclesScreenProps) => {
  const getAllCirclesQuery = trpc.circles.getAll.useQuery();

  const onRefresh = () => {
    getAllCirclesQuery.refetch();
  };

  return (
    <>
      {getAllCirclesQuery.data && (
        <CirclesList
          circles={getAllCirclesQuery.data}
          refreshing={getAllCirclesQuery.isRefetching}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default CirclesScreen;
