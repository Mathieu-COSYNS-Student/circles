import { StyleSheet, Text, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParamList } from "~/navigators/RootNavigator";

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({}: SignUpScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUpScreen;
