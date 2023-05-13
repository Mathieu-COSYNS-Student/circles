import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { createNetworkSchema, type CreateNetworkValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikToInputProps";
import { trpc } from "~/utils/trpc";
import { Form, Text, TextInput } from "~/components/ui";
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

  const onSubmit = async (values: CreateNetworkValues) => {
    await createNetwork.mutateAsync(values);
    navigation.navigate("DrawerNavigator", {
      screen: "Main",
      params: { screen: "Home" },
    });
  };

  return (
    <View className="h-full justify-between">
      <View className="mb-5 h-1/4 justify-center bg-brand-700 dark:bg-brand-600">
        <Text type="heading1" className="mb-8 mt-8 text-center text-white">
          Create Your Network
        </Text>
      </View>
      <View className="flex-grow p-5">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={createNetworkSchema}
          submitTitle="Create your network"
          submitClassName="mt-2"
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
      </View>
    </View>
  );
};