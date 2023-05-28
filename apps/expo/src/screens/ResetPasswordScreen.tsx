import { View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { Form, ScreenContentContainer, Text, TextInput } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResetPassword"
>;

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
  const { isLoaded, signIn, setSession } = useSignIn();
  const trpcContext = trpc.useContext();

  const initialValues: ResetPasswordFormSchema = {
    newPassword: "",
    confirmNewPassword: "",
    signOutOfOtherSessions: false,
  };

  const onSubmit = async (
    values: ResetPasswordFormSchema,
    formikHelpers: FormikHelpers<ResetPasswordFormSchema>,
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      const { createdSessionId } = await signIn.resetPassword({
        password: values.newPassword,
        signOutOfOtherSessions: values.signOutOfOtherSessions,
      });

      await setSession(createdSessionId);
      trpcContext.invalidate();
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
        Choose a new password that you will remenber
      </Text>
      <View className="mt-10 flex-grow justify-between">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={resetPasswordFormSchema}
          submitTitle="Reset password"
        >
          {(formik) => (
            <View>
              <TextInput
                containerClassName="mt-2"
                type="password"
                label="New password"
                placeholder="Your new Password"
                iconStart="lock-closed-outline"
                {...formikToInputProps(formik, "newPassword")}
              />
              <TextInput
                containerClassName="mt-2"
                type="password"
                label="Confirm new password"
                placeholder="Your new Password"
                iconStart="lock-closed-outline"
                {...formikToInputProps(formik, "confirmNewPassword")}
              />
            </View>
          )}
        </Form>
      </View>
    </ScreenContentContainer>
  );
};

export default ResetPasswordScreen;
