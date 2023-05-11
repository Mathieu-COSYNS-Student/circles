import { useEffect, useState } from "react";
import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { formikToDropdownProps } from "~/utils/formikToInputProps";
import { trpc } from "~/utils/trpc";
import { DropDownPicker, Form, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type NetworkInviteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkInvite"
>;

type Values = {
  networkId: string;
};

export const NetworkInviteScreen = ({}: NetworkInviteScreenProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const networkQuery = trpc.networks.getAll.useQuery({
    filter: { canInviteMembers: true },
  });

  const networkInviteMutation = trpc.networks.createInvite.useMutation();

  const invite = async (values: Values) => {
    console.log({ values });
    // const result = await networkInviteMutation.mutateAsync({
    //   networkId: "645a5a8ea997505c2b0e6219",
    // });
    // console.log(result);
  };

  useEffect(() => {
    if (networkQuery.data && networkQuery.data.length === 1)
      setValue((value) => {
        if (value === null) return networkQuery.data[0]?.id ?? null;
        return null;
      });
  }, [networkQuery.data]);

  const initialValues: Values = {
    networkId: value ?? "",
  };

  return (
    <View className="h-full p-2">
      <Text type="heading1">Invite in your network</Text>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        submitTitle="Share"
        onSubmit={invite}
        validationSchema={z.object({
          networkId: z.string(),
        })}
      >
        {(formik) => (
          <>
            <DropDownPicker<string>
              open={open}
              setOpen={setOpen}
              label={"Network"}
              placeholder="Select a network"
              items={
                networkQuery.data?.map((network) => ({
                  value: network.id,
                  label: network.name,
                })) ?? []
              }
              loading={true}
              mode="BADGE"
              {...formikToDropdownProps(formik, "networkId")}
            />
          </>
        )}
      </Form>
    </View>
  );
};
