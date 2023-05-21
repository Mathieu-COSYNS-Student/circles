import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import {
  updatePasswordFormSchema,
  type UpdatePasswordFormSchema,
} from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import {
  Form,
  FullLoading,
  ScreenContentContainer,
  TextInput,
} from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type AccountScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ChangePassword"
>;

export default function ChangePasswordScreen({
  navigation,
}: AccountScreenProps) {
  const { user } = useUser();

  if (!user) return <FullLoading />;

  const initialValues: UpdatePasswordFormSchema = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    signOutOfOtherSessions: false,
  };

  const onSubmit = async (
    values: UpdatePasswordFormSchema,
    formikHelpers: FormikHelpers<UpdatePasswordFormSchema>,
  ) => {
    try {
      await user.updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        signOutOfOtherSessions: values.signOutOfOtherSessions,
      });
      navigation.goBack();
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
    <ScreenContentContainer contentClassName="justify-between">
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={updatePasswordFormSchema}
        submitTitle="Change password"
      >
        {(formik) => (
          <View>
            <TextInput
              containerClassName="mt-6"
              type="password"
              label="Current password"
              placeholder="Your current Password"
              iconStart="lock-closed-outline"
              {...formikToInputProps(formik, "currentPassword")}
            />
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
    </ScreenContentContainer>
  );
}
