import { Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export function useBarCodeScannerPermission() {
  const [permissionResponse, requestPermission] =
    BarCodeScanner.usePermissions();

  const askBarcodeScannerPermission = async () => {
    console.log({ permissionResponse });
    if (
      permissionResponse?.status === "undetermined" ||
      (permissionResponse?.status === "denied" &&
        permissionResponse.canAskAgain)
    ) {
      return (await requestPermission()).granted;
    } else if (
      permissionResponse?.status === "denied" &&
      !permissionResponse.canAskAgain
    ) {
      Alert.alert(
        "Camera access denied",
        "You have denied camera access! Open your phone settings find Circles and allow camera access.",
      );
      return false;
    }
    return permissionResponse?.granted ?? false;
  };

  return {
    hasBarcodeScannerPermission: permissionResponse?.granted,
    askBarcodeScannerPermission,
  };
}
