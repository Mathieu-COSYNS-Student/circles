import { useState } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSignIn } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { passwordSchema } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikToInputProps";
import { Button, SafeAreaView, Text, TextInput } from "~/components/ui";
import { useThemeColor } from "~/hooks/Theme";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

const signInFormSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const errorColor = useThemeColor("error");
  const { signIn, setSession, isLoaded } = useSignIn();
  const [signInError, setSignInError] = useState<string | undefined>();

  const removeSignInError = () => {
    setSignInError(undefined);
  };

  const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: SignInFormValues) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      await setSession(completeSignIn.createdSessionId);
      navigation.navigate("MainTabNavigator");
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
    <SafeAreaView className="flex flex-grow bg-brand-600 dark:bg-brand-700">
      <View className="h-40 flex-grow justify-center p-8">
        <Text type="heading1" className="text-white">
          Welcome back
        </Text>
      </View>
      <Animatable.View
        className="flex rounded-t-3xl bg-brand-50 p-8 dark:bg-zinc-950"
        animation="fadeInUpBig"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(signInFormSchema)}
          validate={removeSignInError}
        >
          {({ handleSubmit, isSubmitting, ...formik }) => (
            <>
              <TextInput
                label="Email"
                placeholder="Your Email"
                iconStart="person-outline"
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
                {...formikToInputProps(formik, "password")}
              />
              <Text
                className="mb-6 ml-auto"
                type="link"
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                Forgot your password?
              </Text>

              <Text style={{ color: errorColor }} className="mb-4">
                {signInError}
              </Text>

              <Button
                title={isSubmitting ? "" : "Sign In"}
                disabled={isSubmitting}
                iconEnd={isSubmitting ? "loading" : undefined}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
        <View className="my-3 flex flex-row items-center">
          <View className="flex-grow border-b border-b-brand-200"></View>
          <Text className="mx-1 pb-1">or</Text>
          <View className="h-0.5 flex-grow  border-b border-b-brand-200" />
        </View>
        <Button
          variant="normal-outline"
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SignInScreen;
