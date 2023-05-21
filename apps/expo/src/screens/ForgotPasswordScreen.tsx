import { View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { type ResetPasswordEmailCodeFactor } from "@clerk/types";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import { forgotPasswordSchema, type ForgotPasswordValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { Form, ScreenContentContainer, Text, TextInput } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

function ensure<T>(
  argument: T | undefined | null,
  message = "This value was promised to be there.",
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { isLoaded, signIn } = useSignIn();

  const initialValues: ForgotPasswordValues = {
    email: "",
  };

  const onSubmit = async (
    values: ForgotPasswordValues,
    formikHelpers: FormikHelpers<ForgotPasswordValues>,
  ) => {
    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: values.email,
      });
      const resetPasswordFactor = ensure(
        signIn.supportedFirstFactors.find(
          (factor) => factor.strategy === "reset_password_email_code",
        ),
      ) as ResetPasswordEmailCodeFactor;
      signIn.prepareFirstFactor(resetPasswordFactor);

      navigation.navigate("ResetPasswordCode");
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
      hero="Forgot My Password"
      contentTopRounded={true}
      contentAnimate={true}
      heroGrow={1}
      contentGrow={4}
      contentClassName="justify-between"
    >
      <Text className="mt-4 text-center text-lg">
        Forgot your password ? No worries, just write your email below and
        we&apos;ll send you a unique code that you can use to reset your
        password.
      </Text>
      <View className="mt-10 flex-grow justify-between">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={forgotPasswordSchema}
          submitTitle="Send a code"
        >
          {(formik) => (
            <>
              <TextInput
                label="Email"
                placeholder="Your Email"
                iconStart="mail-outline"
                autoCapitalize="none"
                autoComplete="email"
                {...formikToInputProps(formik, "email")}
              />
            </>
          )}
        </Form>
      </View>
      {/* Email has been sent! Please check your inbox and click on the link
            to reset your password. */}
    </ScreenContentContainer>
  );
};

export default ForgotPasswordScreen;
