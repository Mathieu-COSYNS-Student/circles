import { Button, ScrollView } from "react-native";
import Constants from "expo-constants";

import { trpc } from "~/utils/trpc";
import { Text, View } from "~/components/Themed";

export default function TestScreen() {
  const testQuery = trpc.health.check.useQuery();
  const testAuthQuery = trpc.auth.getSession.useQuery();
  const usersQuery = trpc.users.getByIds.useQuery([
    "user_2P150vExXFgPZQJEkwBkfHAJl8n",
    "user_2P14wwn2VJgBsMESQ3Qg7xITXLd",
  ]);

  const reload = () => {
    void usersQuery.refetch().then(() => {
      console.log("usersQuery reloaded");
    });
  };

  return (
    <ScrollView>
      <Button onPress={reload} title="Reload" />
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
