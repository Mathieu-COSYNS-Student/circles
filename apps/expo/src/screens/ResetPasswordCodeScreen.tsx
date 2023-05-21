import { View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import {
  resetPasswordEmailCodeSchema,
  type ResetPasswordEmailCodeValues,
} from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { Form, ScreenContentContainer, Text, TextInput } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResetPasswordCode"
>;

export const ResetPasswordCodeScreen = ({
  navigation,
}: ResetPasswordScreenProps) => {
  const { isLoaded, signIn, setSession } = useSignIn();

  const initialValues: ResetPasswordEmailCodeValues = {
    code: "",
  };

  const onSubmit = async (
    values: ResetPasswordEmailCodeValues,
    formikHelpers: FormikHelpers<ResetPasswordEmailCodeValues>,
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      const { createdSessionId } = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: values.code,
      });

      await setSession(createdSessionId);

      navigation.replace("ResetPassword");
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

  const email = signIn?.identifier;

  return (
    <ScreenContentContainer
      hero="Reset Your Password"
      contentTopRounded={true}
      contentAnimate={true}
      heroGrow={1}
      contentGrow={4}
      contentClassName="justify-between"
    >
      <Text className="mt-4 text-center text-lg">
        Check your inbox a mail has been sent to{" "}
        <Text className="font-extrabold">{email}</Text> with a unique code that
        you can use to reset your password.
      </Text>
      <View className="mt-10 flex-grow justify-between">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={resetPasswordEmailCodeSchema}
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
