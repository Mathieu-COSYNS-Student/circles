import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Platform, Button, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useSignIn } from '@clerk/clerk-expo';
import { EmailLinkFactor } from '@clerk/types';
import { RootStackParamList } from '@navigators/root';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { signIn, setSession, isLoaded } = useSignIn();
  const [data, setData] = useState({
    email: '',
    password: '',
    check_EmailChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    invalidCredentialPostSubmission: false,
  });

  const onSignInPress = async () => {
    console.log("Hello I'm here !");
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      await setSession(completeSignIn.createdSessionId);
      navigation.navigate('Circles');
    } catch (err) {
      // @ts-ignore
      console.log('Error:> ' + (err.errors ? err.errors[0].message : err));
      setData({
        ...data,
        invalidCredentialPostSubmission: true,
      });
    }
  }; 

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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
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
          <FontAwesome name="user-o" color="#05375a" size={20} />
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
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : (
            <Animatable.View animation="bounceIn">
              <Feather name="alert-circle" color="red" size={20} />
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
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            value={data.password}
            onChangeText={(password) => handlePasswordChange(password)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase
              letter, and one digit
            </Text>
          </Animatable.View>
        )}
        <Text style={[{ fontSize: 15, paddingTop:10 }]} onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot your password?
        </Text>

        {data.invalidCredentialPostSubmission ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={[styles.errorMsg, { marginTop: 35 }]}>Invalid credentials, please try again</Text>
          </Animatable.View>
        ) : null}

        <View style={styles.button}>
          <LinearGradient colors={['#3c7aad', '#aea4d3']} style={styles.signIn}>
            <TouchableOpacity onPress={onSignInPress} style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.signIn, { borderColor: '#3c7aad', borderWidth: 1, marginTop: 15 }]}
          >
            <Text style={[styles.textSign, { color: '#3c7aad' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#963baf',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#dfdbee',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  logIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
