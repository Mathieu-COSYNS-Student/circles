import { Buffer } from "buffer";
import url from "url";
import React, { useState } from "react";
import { View } from "react-native";
import bs58 from "bs58";
import { z } from "zod";

import { networkInviteSchema } from "@acme/schema";

import { QRcodeScanner } from "~/components/QRcodeScanner";
import { Button, Modal, Text } from "~/components/ui";

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

export const NetworkJoinScanScreen = () => {
  const [invite, setInvite] = useState<Query | null>(null);

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

  return (
    <View className="">
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
            <Button title="Join" />
          </View>
        </View>
      </Modal>
    </View>
  );
};
