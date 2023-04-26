import { ScrollView } from "react-native";
import Constants from "expo-constants";

import { trpc } from "~/utils/trpc";
import { Text, View } from "~/components/Themed";

export default function TestScreen() {
  const testQuery = trpc.health.check.useQuery();
  const testAuthQuery = trpc.auth.getSession.useQuery();

  return (
    <ScrollView>
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
      </View>
    </ScrollView>
  );
}
