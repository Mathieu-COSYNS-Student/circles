import { View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import { signUpSchema, type SignUpValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { Form, ScreenContentContainer, TextInput } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const { isLoaded, signUp } = useSignUp();

  const initialValues: SignUpValues = {
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const onSubmit = async (
    values: SignUpValues,
    formikHelpers: FormikHelpers<SignUpValues>,
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.email,
        password: values.newPassword,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigation.navigate("SignUpEmailVerify");
    } catch (err) {
      formikHelpers.setStatus({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errors:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err && Object.hasOwn(err, "errors") ? err.errors[0].message : err,
      });
    }
  };

  return (
    <ScreenContentContainer
      hero="Create your Circles account"
      contentTopRounded={true}
      contentAnimate={true}
      heroGrow={1}
      contentGrow={4}
      contentClassName="justify-between"
    >
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signUpSchema}
        submitTitle="Sign Up"
      >
        {(formik) => (
          <View>
            <TextInput
              label="First name"
              placeholder="You first name"
              iconStart="person-outline"
              autoCapitalize="none"
              autoComplete="name"
              {...formikToInputProps(formik, "firstName")}
            />
            <TextInput
              label="Last name"
              placeholder="Your last name"
              iconStart="person-outline"
              autoCapitalize="none"
              autoComplete="name-family"
              {...formikToInputProps(formik, "lastName")}
            />
            <TextInput
              label="Email"
              placeholder="Your Email"
              iconStart="mail-outline"
              autoCapitalize="none"
              autoComplete="email"
              {...formikToInputProps(formik, "email")}
            />
            <TextInput
              containerClassName="mt-4"
              type="password"
              label="Password"
              placeholder="Your Password"
              iconStart="lock-closed-outline"
              {...formikToInputProps(formik, "newPassword")}
            />
            <TextInput
              containerClassName="mt-4"
              type="password"
              label="Confirm Password"
              placeholder="Retype your password"
              iconStart="lock-closed-outline"
              {...formikToInputProps(formik, "confirmNewPassword")}
            />
          </View>
        )}
      </Form>
    </ScreenContentContainer>
  );
};

export default SignUpScreen;
