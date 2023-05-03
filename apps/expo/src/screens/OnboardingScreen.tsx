import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParamList } from "~/navigators/RootNavigator";

type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Rotate duration={3000}>
          <Image
            source={require('circles-react-native/assets/images/Circles_logo_round.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </Rotate> */}
        <Animatable.Image
          duration={1500}
          animation="bounceIn"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require("../../assets/images/Circles_logo_round.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>
          Stay connected and organized with Circles
        </Text>
        <Text style={styles.text}>Sign in with an account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <LinearGradient
              colors={["#3c7aad", "#aea4d3"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <Button title="Test" onPress={() => navigation.navigate("Test")} />
    </View>
  );
};

export default OnboardingScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#963baf",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#dfdbee",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
