import { Buffer } from "buffer";
import url from "url";
import React, { useState, type FC } from "react";
import { Alert, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRPCClientError } from "@trpc/client";
import bs58 from "bs58";
import { z } from "zod";

import { joinNetworkSchema, networkInviteSchema } from "@acme/schema";

import { trpc } from "~/utils/trpc";
import { NetworkJoinedModal } from "~/components/NetworkJoinedModal";
import { QRcodeScanner } from "~/components/QRcodeScanner";
import { Button, Modal, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

const querySchema = networkInviteSchema
  .pick({
    id: true,
    code: true,
  })
  .merge(
    z.object({
      name: z
        .string()
        .transform((str) => Buffer.from(bs58.decode(str)).toString()),
    }),
  );
type Query = z.infer<typeof querySchema>;

type NetworkJoinScanScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkJoinScan"
>;

export const NetworkJoinScanScreen: FC<NetworkJoinScanScreenProps> = ({}) => {
  const [invite, setInvite] = useState<Query | null>(null);
  const [joined, setJoined] = useState<string>();
  const joinNetworkMutation = trpc.networks.joinNetwork.useMutation();

  const handleBarCodeScanned = (data: string) => {
    if (invite) return;

    const urlObject = url.parse(data, true);

    if (
      urlObject.protocol !== "circles:" ||
      urlObject.host != "network-invite" ||
      !querySchema.safeParse(urlObject.query).success
    ) {
      alert(`The QRcode scanned is not a valid network invite`);
    } else {
      setInvite(querySchema.parse(urlObject.query));
    }
  };

  const handleJoinButtonPress = async () => {
    if (!invite) return;

    try {
      const result = await joinNetworkMutation.mutateAsync(
        joinNetworkSchema.parse(invite),
      );
      setInvite(null);
      setJoined(result.networkId);
    } catch (err) {
      if (err instanceof TRPCClientError) {
        Alert.alert("Error", err.message);
      }
    }
  };

  return (
    <View>
      <QRcodeScanner
        showRescan={false}
        onBarCodeScanned={handleBarCodeScanned}
      />
      <Modal visible={!!invite} onRequestClose={() => setInvite(null)}>
        <Text className="w-full pb-8 pt-5 text-center">
          Join {invite?.name} network ?
        </Text>
        <View className="mt-2 flex-row">
          <Button
            variant="normal-outline"
            title="Cancel"
            onPress={() => setInvite(null)}
          />
          <View className="ml-2">
            <Button title="Join" onPress={handleJoinButtonPress} />
          </View>
        </View>
      </Modal>
      <NetworkJoinedModal visible={!!joined} />
    </View>
  );
};
