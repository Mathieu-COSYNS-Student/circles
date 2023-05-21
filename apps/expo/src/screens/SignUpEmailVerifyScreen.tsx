import { View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import {
  signUpEmailVerifySchema,
  type SignUpEmailVerifyValues,
} from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { Form, ScreenContentContainer, Text, TextInput } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type SignUpEmailVerifyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUpEmailVerify"
>;

export const SignUpEmailVerifyScreen = ({
  navigation,
}: SignUpEmailVerifyScreenProps) => {
  const { isLoaded, signUp, setSession } = useSignUp();

  const initialValues: SignUpEmailVerifyValues = {
    code: "",
  };

  console.log(JSON.stringify(signUp, undefined, 2));

  const onSubmit = async (
    values: SignUpEmailVerifyValues,
    formikHelpers: FormikHelpers<SignUpEmailVerifyValues>,
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      await setSession(completeSignUp.createdSessionId);

      navigation.navigate("DrawerNavigator", {
        screen: "Main",
        params: { screen: "Home" },
      });
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

  const email = "text@example.com";

  return (
    <ScreenContentContainer
      hero="Create your Circles account"
      contentTopRounded={true}
      contentAnimate={true}
      heroGrow={1}
      contentGrow={4}
    >
      <Text className="mt-4 text-center text-lg">
        We have sent you a verification code by email to verify that the address{" "}
        <Text className="bold">{email}</Text> is yours.
      </Text>
      <View className="mt-10 flex-grow justify-between">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={signUpEmailVerifySchema}
          submitTitle="Submit code"
        >
          {(formik) => (
            <View>
              <TextInput
                label="Code"
                placeholder="12345678"
                keyboardType="numeric"
                maxLength={6}
                {...formikToInputProps(formik, "code")}
              />
            </View>
          )}
        </Form>
      </View>
    </ScreenContentContainer>
  );
};
