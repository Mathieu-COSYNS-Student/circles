import React from 'react';
import { StyleSheet, View, Text, TextInput, Platform, Button } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const { signIn, setSession, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
      router.push('/');
    } catch (err) {
      // @ts-ignore
      console.log('Error:> ' + (err.errors ? err.errors[0].message : err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Stay Connected!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <Feather name="check-circle" color="green" size={2} />
        </View>
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="key" color="#05375a" size={20} />
          <TextInput
            placeholder="Your password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Feather name="check-circle" color="green" size={2} />
        </View>
        <Button onPress={onSignInPress} title="Sign in" />
        <Link href="SignUpScreen" replace={true}>
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default LoginScreen;

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
});
