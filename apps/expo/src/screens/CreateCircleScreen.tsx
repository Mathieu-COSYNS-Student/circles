import React, { useEffect, useState, type FC } from "react";
import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { createCircleSchema, type CreateCircleValues } from "@acme/schema";

import { formikToDropdownProps, formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import {
  DropDownPicker,
  ScreenContentContainer,
  TextInput,
} from "~/components/ui";
import { Form } from "~/components/ui/Form";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateCircle"
>;

const CreateCircleScreen: FC<ChatScreenProps> = ({ navigation }) => {
  const createNewCircleMutation = trpc.circles.create.useMutation();

  const [initialNetworkId, setInitialNetworkId] = useState<string | null>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(
    null,
  );

  const getNetworksQuery = trpc.networks.getAll.useQuery({
    filter: { canCreateCircles: true },
  });

  useEffect(() => {
    if (getNetworksQuery.data && getNetworksQuery.data.length === 1)
      setInitialNetworkId((value) => {
        if (value === null) return getNetworksQuery.data[0]?.id ?? null;
        return null;
      });
  }, [getNetworksQuery.data]);

  useEffect(() => {
    setSelectedNetworkId((value) => (!value ? initialNetworkId : value));
  }, [initialNetworkId]);

  const initialValues: CreateCircleValues = {
    name: "",
    networkId: initialNetworkId ?? "",
  };

  const validate = (values: CreateCircleValues) => {
    setSelectedNetworkId(values.networkId);
  };

  const onSubmit = async (values: CreateCircleValues) => {
    await createNewCircleMutation.mutateAsync(values);
    navigation.goBack();
  };

  return (
    <ScreenContentContainer>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createCircleSchema}
        validate={validate}
        submitTitle="Create"
      >
        {(formik) => (
          <View className="flex-grow">
            <DropDownPicker<string>
              label={"Network"}
              placeholder="Select a network"
              items={
                getNetworksQuery.data?.map((network) => ({
                  value: network.id,
                  label: network.name,
                })) ?? []
              }
              loading={getNetworksQuery.isLoading}
              {...formikToDropdownProps(formik, "networkId")}
            />
            <View className="mt-2">
              <TextInput
                label="Circle name"
                {...formikToInputProps(formik, "name")}
              />
            </View>
          </View>
        )}
      </Form>
    </ScreenContentContainer>
  );
};

export default CreateCircleScreen;
