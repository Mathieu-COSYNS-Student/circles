import React, { type FC } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  BarCodeScanner,
  type BarCodeScannedCallback,
} from "expo-barcode-scanner";
import QRcodeScannerFrame from "~assets/images/qrcode_scanner_frame.svg";

import { Button, Text } from "~/components/ui";
import { useBarCodeScannerPermission } from "~/hooks/useBarCodeScannerPermission";

type QRcodeScannerProps = {
  onBarCodeScanned: (data: string) => void;
  onRescanPress?: () => void;
  showRescan?: boolean;
};

export const QRcodeScanner: FC<QRcodeScannerProps> = ({
  onBarCodeScanned,
  onRescanPress,
  showRescan = true,
}) => {
  const { hasBarcodeScannerPermission, askBarcodeScannerPermission } =
    useBarCodeScannerPermission();
  const { width, height } = useWindowDimensions();
  const qrcodeScannerFrameSize = (Math.min(width, height) / 7) * 5;

  if (typeof hasBarcodeScannerPermission === "undefined") return null;

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    onBarCodeScanned(data);
  };

  if (!hasBarcodeScannerPermission) {
    return (
      <View className="h-full w-full items-center justify-center p-2">
        <Text>Circle does not have camera access</Text>
        <Button
          title="Grant Circles camera access"
          onPress={askBarcodeScannerPermission}
        />
      </View>
    );
  }

  return (
    <View className="h-full w-full items-center justify-center">
      <BarCodeScanner
        onBarCodeScanned={showRescan ? undefined : handleBarCodeScanned}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={StyleSheet.absoluteFillObject}
      />
      <QRcodeScannerFrame width={qrcodeScannerFrameSize} />
      <View className="absolute p-2">
        {showRescan && (
          <Button title={"Tap to Scan Again"} onPress={onRescanPress} />
        )}
      </View>
    </View>
  );
};
