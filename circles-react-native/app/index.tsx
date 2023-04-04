import { CirclesList } from '@components/CircleList';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import { trpc } from '@utils/trpc';

const CirclesListPage = () => {
  const getAllCirclesQuery = trpc.circles.getAll.useQuery();
  const router = useRouter();

  console.log(getAllCirclesQuery);

  return (
    <>
      {getAllCirclesQuery.data && <CirclesList circles={getAllCirclesQuery.data} />}
      <Button title="Dev" onPress={() => router.push('/dev')} />
    </>
  );
};

export default CirclesListPage;
