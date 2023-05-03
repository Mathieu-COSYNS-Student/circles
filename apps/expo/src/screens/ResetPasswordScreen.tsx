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

type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResetPassword"
>;

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
  const [data, setData] = useState({
    newPassword: "",
    confirmNewPassword: "",
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidPassword: true,
    IsValidConfirmPassword: true,
  });

  const handlePasswordChange = (passwordInput: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegex.test(passwordInput)) {
      setData({
        ...data,
        newPassword: passwordInput,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        newPassword: passwordInput,
        isValidPassword: false,
      });
    }
  };
  const handleConfirmPasswordChange = (confirmInput: string) => {
    if (data.newPassword == confirmInput) {
      setData({
        ...data,
        confirmNewPassword: confirmInput,
        IsValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirmNewPassword: confirmInput,
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
        <Text style={styles.text_header}>Reset Your Password</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={[styles.text_footer]}>Type your new password</Text>
        <View style={styles.action}>
          <Ionicons name="lock-closed-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Your New Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            value={data.newPassword}
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
          Confirm New Password
        </Text>
        <View style={styles.action}>
          <Ionicons name="lock-closed-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Retype your new password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.confirmSecureTextEntry ? true : false}
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirmSecureTextEntry ? (
              <Ionicons name="eye-off-outline" color="grey" size={20} />
            ) : (
              <Ionicons name="eye-off" color="grey" size={20} />
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
            <Text style={[styles.textSign, { color: "#3c7aad" }]}>
              Change & Sign in
            </Text>
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

export default ResetPasswordScreen;
