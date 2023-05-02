import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Platform, Button, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useSignIn } from '@clerk/clerk-expo';
import { RootStackParamList } from '@navigators/root';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { EmailLinkFactor } from '@clerk/types';
import { sendIntent } from 'expo-linking';
import { toast } from 'react-toastify';

type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { signIn, setSession } = useSignIn();
  const [data, setData] = useState({
    email: '',
    password: '',
    check_EmailChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    invalidCredentialPostSubmission: false,
  });
  const [isEmailSentSuccessful, setIsEmailSentSuccessful] = useState(false);

  const OnForgotPassword = async () => {
    // Prepare sign in with strategy and identifier
    await signIn!.create({
      strategy: 'email_link',
      identifier: data.email,
      redirectUrl: `http://192.168.0.242:19000/ResetPassword`,
    });
    console.log('Look at the signIn hook : ', signIn);
    // Make sure that email magic links are supported on this user.
    const firstFactor = signIn!.supportedFirstFactors.find((f) => f.strategy === 'email_link') as EmailLinkFactor;
    // Find the correct emailAddressId for the user.
    const { emailAddressId } = firstFactor;
    // Begin the magic link flow
    const { startMagicLinkFlow } = signIn!.createMagicLinkFlow();
    // The redirectUrl should be a page where your user can change their password.
    try {
      const response = await startMagicLinkFlow({
        emailAddressId,
        redirectUrl: `http://192.168.0.242:19000/ResetPassword`,
      });

      setData({
        ...data,
        invalidCredentialPostSubmission: true,
      });
      // Create a sesssion once the user is verified
      if (response.status === 'complete' && setSession) {
        setSession(response.createdSessionId, () => navigation.navigate('ResetPassword'));
        return;
      }
    } catch (error) {
      toast.error('An error occured');
      console.log('Error sending email: ', error);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Forgot My Password</Text>
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
            onChangeText={(email) => handleEmailChange(email)}
          />
        </View>
        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email must be valid</Text>
          </Animatable.View>
        )}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={OnForgotPassword}
            style={[styles.signIn, { borderColor: '#3c7aad', borderWidth: 1 }]}
          >
            <Text style={[styles.textSign, { color: '#3c7aad' }]}>Next</Text>
          </TouchableOpacity>
        </View>
        {data.invalidCredentialPostSubmission ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text
              style={[
                styles.successMsg,
                {
                  marginTop: 35,
                },
              ]}
            >
              Email has been sent! Please check your inbox and click on the link to reset your password.
            </Text>
          </Animatable.View>
        ) : null}
      </Animatable.View>
    </View>
  );
};

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
  successMsg: {
    color: '#3c7aad',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
