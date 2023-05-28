import { useSignIn } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FormikHelpers } from "formik";

import { signInSchema, type SignInValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import {
  Button,
  Form,
  OrSeparator,
  ScreenContentContainer,
  Text,
  TextInput,
} from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { signIn, setSession, isLoaded } = useSignIn();
  const trpcContext = trpc.useContext();

  const initialValues: SignInValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: SignInValues,
    formikHelpers: FormikHelpers<SignInValues>,
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      await setSession(completeSignIn.createdSessionId);
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
      hero="Welcome"
      contentTopRounded={true}
      contentAnimate={true}
      heroGrow={1}
      contentGrow={0}
    >
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
        submitTitle="Sign In"
      >
        {(formik) => (
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
              className="ml-auto mt-1"
              type="link"
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot your password?
            </Text>
          </>
        )}
      </Form>
      <OrSeparator />
      <Button
        variant="normal-outline"
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
    </ScreenContentContainer>
  );
};

export default SignInScreen;
