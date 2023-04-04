import { CirclesList } from '@components/CircleList';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import { trpc } from '@utils/trpc';
import { useState } from 'react';
import { Text } from '@components/Themed';

const CirclesListPage = () => {
  const getAllCirclesQuery = trpc.circles.getAll.useQuery();
  const [randomNumber, setRandomNumber] = useState<number>();
  trpc.health.randomNumber.useSubscription(undefined, {
    onData(n) {
      setRandomNumber(n);
    },
  });
  const router = useRouter();

  console.log(getAllCirclesQuery);

  return (
    <>
      {getAllCirclesQuery.data && <CirclesList circles={getAllCirclesQuery.data} />}
      <Text>A Random number for a websocket : {randomNumber?.toFixed(5)}</Text>
      <Button title="Dev" onPress={() => router.push('/dev')} />
      <Button title="Onboarding" onPress={() => router.push('/OnboardingScreen')} />
    </>
  );
};

export default CirclesListPage;
