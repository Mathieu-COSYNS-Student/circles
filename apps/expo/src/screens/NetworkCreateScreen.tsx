import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRPCClientError } from "@trpc/client";
import { type FormikHelpers } from "formik";

import { createNetworkSchema, type CreateNetworkValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { Form, ScreenContentContainer, TextInput } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type NetworkCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkCreate"
>;

export const NetworkCreateScreen = ({
  navigation,
}: NetworkCreateScreenProps) => {
  const createNetwork = trpc.networks.create.useMutation();
  const { user } = useUser();

  const initialValues: CreateNetworkValues = {
    name: user?.fullName || "",
  };

  const onSubmit = async (
    values: CreateNetworkValues,
    formikHelpers: FormikHelpers<CreateNetworkValues>,
  ) => {
    try {
      await createNetwork.mutateAsync(values);
      navigation.navigate("DrawerNavigator", {
        screen: "Main",
        params: { screen: "Home" },
      });
    } catch (err) {
      if (err instanceof TRPCClientError) {
        formikHelpers.setStatus({ errors: err.message });
      }
    }
  };

  return (
    <ScreenContentContainer hero="Create Your Network">
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createNetworkSchema}
        submitTitle="Create your network"
      >
        {(formik) => (
          <View className="flex-grow">
            <TextInput
              label="Enter a name for your network"
              hint="A network name is something that identify you (Usually your name)."
              {...formikToInputProps(formik, "name")}
            />
          </View>
        )}
      </Form>
    </ScreenContentContainer>
  );
};
