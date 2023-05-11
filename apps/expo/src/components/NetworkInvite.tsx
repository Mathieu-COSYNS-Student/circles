import React from "react";
import { View, useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

import {
  type Network,
  type NetworkInvite as NetworkInviteType,
} from "@acme/schema";

import { getPreferredLocale } from "~/utils/i18n";
import { FullLoading, Text } from "~/components/ui";

type NetworkInviteProps = {
  isLoading: boolean;
  isRefetching: boolean;
  isShared?: boolean;
  networkName?: Network["name"];
  networkInvite?: NetworkInviteType;
  onRefetch: () => void;
};

export const NetworkInvite = ({
  isLoading,
  isRefetching,
  isShared = false,
  networkName,
  networkInvite,
  onRefetch,
}: NetworkInviteProps) => {
  const { width, height } = useWindowDimensions();

  if (isLoading || isRefetching) {
    return <FullLoading />;
  }

  if (!networkInvite) return null;

  const locale = getPreferredLocale();

  const expirationDate = new Date(networkInvite.expireAt);

  return (
    <View className="mb-4 mt-2 flex-grow justify-between">
      <Text className="text-center">
        Share this code with the person you wish to invite in {networkName}{" "}
        network or if he/she already have the app he/she can scan the QRcode.
      </Text>
      <Text type="heading1" className="mt-2 text-center">
        {networkInvite?.code}
      </Text>
      <View className="items-center justify-center">
        <View
          className="m-2 w-full items-center"
          style={{
            height: (Math.min(width, height) / 3) * 2,
          }}
        >
          {isShared ? (
            <View className="h-full w-full items-center justify-center rounded-xl bg-green-400 dark:bg-green-600">
              <Text type="heading2">You have shared this code!</Text>
            </View>
          ) : (
            <QRCode
              quietZone={15}
              value={networkInvite?.code}
              size={(Math.min(width, height) / 3) * 2}
            />
          )}
        </View>
      </View>
      <Text onPress={onRefetch} className="text-center">
        Those code and QRcode are valid until{" "}
        {expirationDate?.toLocaleString(locale, {
          weekday: "long",
        })}
        .{" "}
        <Text type="link">
          Generate a new one <Ionicons name="reload-outline" />
        </Text>
      </Text>
    </View>
  );
};
