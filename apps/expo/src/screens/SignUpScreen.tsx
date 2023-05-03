import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParamList } from "~/navigators/RootNavigator";

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    check_EmailChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    IsValidConfirmPassword: true,
  });

  const handleEmailChange = (val: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (emailRegex.test(val)) {
      setData({
        ...data,
        email: val,
        check_EmailChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_EmailChange: false,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = (passwordInput: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegex.test(passwordInput)) {
      setData({
        ...data,
        password: passwordInput,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: passwordInput,
        isValidPassword: false,
      });
    }
  };
  const handleConfirmPasswordChange = (confirmInput: string) => {
    if (data.password == confirmInput) {
      setData({
        ...data,
        confirmPassword: confirmInput,
        IsValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: confirmInput,
        IsValidConfirmPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Stay Connected!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Ionicons name="person-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            value={data.email}
            //onChangeText={setEmailAddress}
            onChangeText={(email) => handleEmailChange(email)}
          />
          {data.check_EmailChange ? (
            <Animatable.View animation="bounceIn">
              <Ionicons
                name="checkmark-circle-outline"
                color="green"
                size={20}
              />
            </Animatable.View>
          ) : (
            <Animatable.View animation="bounceIn">
              <Ionicons name="alert-circle-outline" color="red" size={20} />
            </Animatable.View>
          )}
        </View>
        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email must be valid</Text>
          </Animatable.View>
        )}
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Ionicons name="lock-closed-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            value={data.password}
            //onChangeText={setPassword}
            onChangeText={(password) => handlePasswordChange(password)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Ionicons name="eye-off-outline" color="grey" size={20} />
            ) : (
              <Ionicons name="eye-outline" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be at least 6 characters long and contain at least
              one uppercase letter, one lowercase letter, and one digit
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Ionicons name="lock-closed-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Retype your password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.confirmSecureTextEntry ? true : false}
            //value={password}
            //onChangeText={setPassword}
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirmSecureTextEntry ? (
              <Ionicons name="eye-off-outline" color="grey" size={20} />
            ) : (
              <Ionicons name="eye-outline" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.IsValidConfirmPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be identical</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.goBack} // TODO
            style={[
              styles.signIn,
              { borderColor: "#3c7aad", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#3c7aad" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#963baf",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#dfdbee",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  logIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});

export default SignUpScreen;
