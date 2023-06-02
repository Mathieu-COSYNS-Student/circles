import React, { useEffect, useState, type FC } from "react";
import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  createCircleSchema,
  type CreateCircleValues,
  type NetworkMember as NetworkMemberType,
} from "@acme/schema";

import { formikToDropdownProps, formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { NetworkMember } from "~/components/NetworkMember";
import {
  DataFlatList,
  DropDownPicker,
  ScreenContentContainer,
  Text,
  TextInput,
} from "~/components/ui";
import { Form } from "~/components/ui/Form";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateCircle"
>;

const CreateCircleScreen: FC<ChatScreenProps> = ({ navigation }) => {
  const { user } = useUser();
  const createNewCircleMutation = trpc.circles.create.useMutation();

  const [initialNetworkId, setInitialNetworkId] = useState<string | null>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(
    null,
  );
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],
  );

  const getNetworksQuery = trpc.networks.getAll.useQuery({
    filter: { canCreateCircles: true },
  });

  const getNetworkMembersQuery = trpc.networks.getMembers.useQuery(
    {
      networkId: selectedNetworkId ?? "",
    },
    {
      enabled: !!selectedNetworkId,
    },
  );

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

  const initialValues: Omit<CreateCircleValues, "members"> = {
    name: "",
    networkId: initialNetworkId ?? "",
  };

  const renderItem = ({ item }: { item: NetworkMemberType }) => {
    return (
      <NetworkMember
        member={item}
        checked={selectedParticipants.includes(item.id)}
        size={24}
        onPress={() => {
          setSelectedParticipants((selectedParticipants) => {
            if (selectedParticipants.includes(item.id))
              return selectedParticipants.filter((id) => id != item.id);
            return [...selectedParticipants, item.id];
          });
        }}
      />
    );
  };

  const validate = (values: Omit<CreateCircleValues, "members">) => {
    setSelectedNetworkId(values.networkId);
  };

  const onSubmit = async (values: Omit<CreateCircleValues, "members">) => {
    await createNewCircleMutation.mutateAsync({
      ...values,
      members: selectedParticipants,
    });
    navigation.goBack();
  };

  return (
    <ScreenContentContainer scrollable={false}>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createCircleSchema.omit({ members: true })}
        validate={validate}
        submitTitle="Create"
      >
        {(formik) => (
          <DataFlatList
            ListHeaderComponent={
              <>
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
                <Text type="heading4" className="mb-2 mt-5">
                  Participants
                </Text>
              </>
            }
            data={getNetworkMembersQuery.data?.filter(
              (member) => member.id !== user?.id,
            )}
            renderItem={renderItem}
          />
        )}
      </Form>
    </ScreenContentContainer>
  );
};

export default CreateCircleScreen;
