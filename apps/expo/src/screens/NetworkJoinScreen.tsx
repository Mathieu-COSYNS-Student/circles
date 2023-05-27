import { useState } from "react";
import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRPCClientError } from "@trpc/client";
import { type FormikHelpers } from "formik";

import {
  joinNetworkFormSchema,
  joinNetworkSchema,
  type JoinNetworkFormValues,
} from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { NetworkJoinedModal } from "~/components/NetworkJoinedModal";
import {
  Button,
  Form,
  OrSeparator,
  ScreenContentContainer,
  TextInput,
} from "~/components/ui";
import { useBarCodeScannerPermission } from "~/hooks/useBarCodeScannerPermission";
import { type DrawerParamList } from "~/navigators/DrawerNavigator";

type NetworkJoinScreenProps = NativeStackScreenProps<
  DrawerParamList,
  "NetworkJoin"
>;

export const NetworkJoinScreen = ({ navigation }: NetworkJoinScreenProps) => {
  const { hasBarcodeScannerPermission, askBarcodeScannerPermission } =
    useBarCodeScannerPermission();
  const [joined, setJoined] = useState<string>();
  const joinNetworkMutation = trpc.networks.joinNetwork.useMutation();

  const initialValues: JoinNetworkFormValues = {
    networkName: "",
    code: "",
  };

  const onSubmit = async (
    values: JoinNetworkFormValues,
    formikHelpers: FormikHelpers<JoinNetworkFormValues>,
  ) => {
    try {
      const result = await joinNetworkMutation.mutateAsync(
        joinNetworkSchema.parse(values),
      );
      setJoined(result.networkId);
    } catch (err) {
      if (err instanceof TRPCClientError) {
        formikHelpers.setStatus({ errors: err.message });
      }
    }
  };

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
    <ScreenContentContainer hero="Join a Network">
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={joinNetworkFormSchema}
        submitTitle="Join network"
        submitClassName="mb-6"
      >
        {(formik) => (
          <>
            <TextInput
              label="Network name"
              {...formikToInputProps(formik, "networkName")}
            />
            <TextInput
              containerClassName="mt-2"
              label="Network code"
              keyboardType="numeric"
              maxLength={8}
              {...formikToInputProps(formik, "code")}
            />
          </>
        )}
      </Form>
      <OrSeparator />
      <View className="my-6 items-center justify-center">
        <Button
          variant="neutral"
          title="Scan a QRcode"
          iconStart="qr-code-outline"
          rounded
          size="huge"
          onPress={onPressScanQRcode}
        />
      </View>
      <NetworkJoinedModal visible={!!joined} />
    </ScreenContentContainer>
  );
};
