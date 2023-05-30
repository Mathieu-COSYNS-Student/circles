import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Home } from "~/components/Home";
import { HomeWelcome } from "~/components/HomeWelcome";
import { FullLoading } from "~/components/ui";
import { useNetworksContext } from "~/contexts/NetworksContext";
import { type MainTabParamList } from "~/navigators/MainTabNavigator";

type HomeScreenProps = NativeStackScreenProps<MainTabParamList, "Home">;

export const HomeScreen = ({}: HomeScreenProps) => {
  const { isLoading, networks } = useNetworksContext();

  if (isLoading) return <FullLoading />;

  if (networks.length === 0) return <HomeWelcome />;

  return <Home />;
};
