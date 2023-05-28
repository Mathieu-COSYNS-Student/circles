import { useEffect, useState } from "react";
import { Alert, Share, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { type Network } from "@acme/schema";

import { formikToDropdownProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { NetworkInvite } from "~/components/NetworkInvite";
import {
  Button,
  DropDownPicker,
  Form,
  ScreenContentContainer,
} from "~/components/ui";
import { type DrawerParamList } from "~/navigators/DrawerNavigator";
import { useRootNavigation } from "~/navigators/useRootNavigation";

type NetworkInviteScreenProps = NativeStackScreenProps<
  DrawerParamList,
  "NetworkInvite"
>;

type Values = {
  networkId: string;
};

export const NetworkInviteScreen = ({}: NetworkInviteScreenProps) => {
  const navigation = useRootNavigation();
  const [initialNetworkId, setInitialNetworkId] = useState<string | null>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(
    null,
  );
  const [sharedInviteId, setSharedInviteId] = useState<string[]>([]);

  const getNetworksQuery = trpc.networks.getAll.useQuery({
    filter: { canInviteMembers: true },
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

  const getNetworkName = (networkId: Network["id"]) => {
    return (
      getNetworksQuery.data?.find((network) => network.id === networkId)
        ?.name ?? ""
    );
  };

  const networkInviteForSelectedNetworkQuery =
    trpc.networks.createInvite.useQuery(
      {
        networkId: selectedNetworkId ?? "",
      },
      {
        enabled: !!selectedNetworkId,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 60 * 1000,
      },
    );

  const share = async (values: Values) => {
    if (
      selectedNetworkId !== values.networkId ||
      selectedNetworkId !== networkInviteForSelectedNetworkQuery.data?.networkId
    ) {
      Alert.alert(
        "Error",
        "An error happened while preparing to share. Try again or contact Circle if the error persist.",
      );
      return;
    }
    try {
      const result = await Share.share({
        message:
          `Hi, I wish you to join my network "${getNetworkName(
            selectedNetworkId,
          )}" ` +
          "in the app Circles. It's an app to exchange messages and help. " +
          "To do so you need to have an account on the app then go to Add a network " +
          `and enter ${getNetworkName(
            selectedNetworkId,
          )} as the network name ` +
          `and ${networkInviteForSelectedNetworkQuery.data.code} as the network unique code.`,
      });
      if (result.action === Share.sharedAction) {
        const id = networkInviteForSelectedNetworkQuery.data.id;
        if (id) setSharedInviteId((list) => [id, ...list]);
      } else if (result.action === Share.dismissedAction) {
        Alert.alert(
          "Info",
          "We have detected than you didn't shared the code correctly.",
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert("An error happened while sharing");
      }
    }
  };

  const isShared = sharedInviteId.includes(
    networkInviteForSelectedNetworkQuery.data?.id ?? "",
  );

  const initialValues: Values = {
    networkId: initialNetworkId ?? "",
  };

  const validate = (values: Values) => {
    setSelectedNetworkId(values.networkId);
  };

  return (
    <ScreenContentContainer hero="Invite someone in a network">
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        submitTitle={isShared ? undefined : "Share"}
        onSubmit={share}
        validationSchema={z.object({
          networkId: z.string(),
        })}
        validate={validate}
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
            <View className="mt-2 flex-grow">
              {selectedNetworkId && (
                <NetworkInvite
                  isLoading={networkInviteForSelectedNetworkQuery.isLoading}
                  isRefetching={
                    networkInviteForSelectedNetworkQuery.isRefetching
                  }
                  isShared={isShared}
                  networkName={getNetworkName(selectedNetworkId)}
                  networkInvite={networkInviteForSelectedNetworkQuery.data}
                  onRefetch={networkInviteForSelectedNetworkQuery.refetch}
                />
              )}
            </View>
          </View>
        )}
      </Form>
      {isShared && (
        <View className="flex-row">
          <View className="w-1/2 pr-1">
            <Button
              variant="normal-outline"
              title="New Invite"
              onPress={() => networkInviteForSelectedNetworkQuery.refetch()}
            />
          </View>
          <View className="w-1/2 pl-1">
            <Button title="Go back" onPress={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </ScreenContentContainer>
  );
};
