import { CirclesList } from '@components/CircleList';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
import { Text } from '@components/Themed';
import { useAuth } from '@clerk/clerk-expo';

const CirclesListPage = () => {
  const getAllCirclesQuery = trpc.circles.getAll.useQuery();
  const [randomNumber, setRandomNumber] = useState<number>();
  trpc.health.randomNumber.useSubscription(undefined, {
    onData(n) {
      setRandomNumber(n);
    },
  });
  const router = useRouter();

  const { signOut } = useAuth();

  async function onSignOutPress() {
    await signOut();
  }

  return (
    <>
      {getAllCirclesQuery.data && <CirclesList circles={getAllCirclesQuery.data} />}
      <Text>A Random number for a websocket : {randomNumber?.toFixed(5)}</Text>
      <Button title="Sign out" onPress={onSignOutPress} />
      <Button title="Dev" onPress={() => router.push('/dev')} />
    </>
  );
};

export default CirclesListPage;
