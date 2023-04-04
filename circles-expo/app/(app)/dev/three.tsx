import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';
import { trpc } from '@utils/trpc';

export default function TabThreeScreen() {
  const greetingQuery = trpc.greeting.useQuery();
  const userQuery = trpc.getUser.useQuery('1');
  const createUserMutation = trpc.createUser.useMutation();

  const createUser = async () => {
    // Error
    // await createUserMutation.mutate({
    //   email: 'nope',
    // });
    // No error
    await createUserMutation.mutate({
      email: 'test2@gmail.com',
    });
  };

  return (
    <View style={styles.container}>
      <Text>{greetingQuery.data}</Text>
      <Text style={styles.title}>Hi {userQuery.data?.name}</Text>
      <Button onPress={createUser} title="Create a new user" />
      <Text>{createUserMutation.error?.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
