import { Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { trpc } from "~/utils/trpc";
import { CirclesList } from "~/components/CircleList";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type CirclesScreenProps = NativeStackScreenProps<RootStackParamList, "Circles">;

const CirclesScreen = ({ navigation }: CirclesScreenProps) => {
  const getAllCirclesQuery = trpc.circles.getAll.useQuery();

  const { signOut } = useAuth();

  async function onSignOutPress() {
    await signOut();
  }

  return (
    <>
      {getAllCirclesQuery.data && (
        <CirclesList circles={getAllCirclesQuery.data} />
      )}
      <Button title="Sign out" onPress={onSignOutPress} />
      <Button title="Test" onPress={() => navigation.navigate("Test")} />
    </>
  );
};

export default CirclesScreen;
