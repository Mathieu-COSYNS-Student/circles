import { ScrollView, View } from "react-native";
import Constants from "expo-constants";

import { trpc } from "~/utils/trpc";
import { Button, Text } from "~/components/ui";

export default function TestScreen() {
  const testQuery = trpc.health.check.useQuery({ firebase: true });
  const testAuthQuery = trpc.auth.getSession.useQuery();
  const usersQuery = trpc.users.getByIds.useQuery([
    "user_2P150vExXFgPZQJEkwBkfHAJl8n",
    "user_2P14wwn2VJgBsMESQ3Qg7xITXLd",
  ]);

  const reload = () => {
    void testQuery.refetch().then(() => {
      console.log("testQuery reloaded");
    });
    void testAuthQuery.refetch().then(() => {
      console.log("testAuthQuery reloaded");
    });
    void usersQuery.refetch().then(() => {
      console.log("usersQuery reloaded");
    });
  };

  return (
    <ScrollView className="p-2">
      <View className="mb-2">
        <Button onPress={reload} title="Reload" />
      </View>
      <View>
        <Text>Tests : </Text>
        <Text>
          {JSON.stringify(
            { debuggerHost: Constants.manifest?.debuggerHost },
            undefined,
            2,
          )}
        </Text>
        <Text>
          {testQuery.error
            ? JSON.stringify(testQuery.error, undefined, 2)
            : JSON.stringify(testQuery.data, undefined, 2)}
        </Text>
        <Text>
          {testAuthQuery.error
            ? JSON.stringify(testAuthQuery.error, undefined, 2)
            : JSON.stringify(testAuthQuery.data, undefined, 2)}
        </Text>
        <Text>Users:</Text>
        <Text>
          {usersQuery.error
            ? JSON.stringify(usersQuery.error, undefined, 2)
            : JSON.stringify(usersQuery.data, undefined, 2)}
        </Text>
      </View>
    </ScrollView>
  );
}
