import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { formikToInputProps } from "~/utils/formikToInputProps";
import { Button, Form, OrSeparator, Text, TextInput } from "~/components/ui";
import { useBarCodeScannerPermission } from "~/hooks/useBarCodeScannerPermission";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type NetworkJoinScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkJoin"
>;

export const NetworkJoinScreen = ({ navigation }: NetworkJoinScreenProps) => {
  const { hasBarcodeScannerPermission, askBarcodeScannerPermission } =
    useBarCodeScannerPermission();

  const initialValues = {
    name: "",
  };

  const onSubmit = () => {};

  const onPressScanQRcode = async () => {
    if (hasBarcodeScannerPermission) {
      navigation.navigate("NetworkJoinScan");
    } else {
      if (await askBarcodeScannerPermission()) {
        navigation.navigate("NetworkJoinScan");
      }
    }
  };

  return (
    <View className="h-full justify-between">
      <View className="mb-5 h-1/4 justify-center bg-brand-700 dark:bg-brand-600">
        <Text type="heading1" className="mb-8 mt-8 text-center text-white">
          Join a Network
        </Text>
      </View>
      <View className="flex-grow p-5">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={z.object({ name: z.string() })}
          submitTitle="Join network"
          submitClassName="mt-3 mb-8"
        >
          {(formik) => (
            <>
              <TextInput
                label="Network name"
                {...formikToInputProps(formik, "name")}
              />
              <TextInput
                containerClassName="mt-2"
                label="Network code"
                {...formikToInputProps(formik, "name")}
              />
            </>
          )}
        </Form>
        <OrSeparator />
        <View className="mt-8 items-center justify-center">
          <Button
            variant="neutral"
            title="Scan a QRcode"
            iconStart="qr-code-outline"
            rounded
            size="huge"
            onPress={onPressScanQRcode}
          />
        </View>
      </View>
    </View>
  );
};
