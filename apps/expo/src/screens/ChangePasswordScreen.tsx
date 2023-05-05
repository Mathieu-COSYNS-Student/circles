import { useState } from "react";
import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { passwordSchema } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikToInputProps";
import { Button, FullLoading, Text, TextInput } from "~/components/ui";
import { useThemeColor } from "~/hooks/Theme";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type AccountScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ChangePassword"
>;

const updatePasswordFormSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
    signOutOfOtherSessions: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type UpdatePasswordFormValues = z.infer<typeof updatePasswordFormSchema>;

export default function ChangePasswordScreen({
  navigation,
}: AccountScreenProps) {
  const { user } = useUser();
  const errorColor = useThemeColor("error");
  const [signInError, setSignInError] = useState<string | undefined>();

  if (!user) return <FullLoading />;

  const removeSignInError = () => {
    setSignInError(undefined);
  };

  const initialValues: UpdatePasswordFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    signOutOfOtherSessions: false,
  };

  const onSubmit = async (values: UpdatePasswordFormValues) => {
    try {
      await user.updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        signOutOfOtherSessions: values.signOutOfOtherSessions,
      });
      navigation.goBack();
    } catch (err) {
      setSignInError(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        err && Object.hasOwn(err, "errors") ? err.errors[0].message : err,
      );
    }
  };

  return (
    <View className="h-full justify-between p-2">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(updatePasswordFormSchema)}
        validate={removeSignInError}
      >
        {({ handleSubmit, isSubmitting, ...formik }) => (
          <>
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
              <Text style={{ color: errorColor }} className="mb-4">
                {signInError}
              </Text>
            </View>
            <View>
              <View className="mx-3 mb-4">
                <Button
                  title={isSubmitting ? "" : "Change password"}
                  disabled={isSubmitting}
                  iconEnd={isSubmitting ? "loading" : undefined}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
