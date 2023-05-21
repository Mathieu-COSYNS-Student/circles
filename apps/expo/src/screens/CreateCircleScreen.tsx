import React, { type FC } from "react";
import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { createCircleSchema, type CreateCircleValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { ScreenContentContainer, TextInput } from "~/components/ui";
import { Form } from "~/components/ui/Form";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateCircle"
>;

const CreateCircleScreen: FC<ChatScreenProps> = ({ navigation }) => {
  const createNewCircleMutation = trpc.circles.create.useMutation();

  const onSubmit = async (values: CreateCircleValues) => {
    await createNewCircleMutation.mutateAsync(values);
    navigation.goBack();
  };

  const initialValues: CreateCircleValues = { name: "" };

  return (
    <ScreenContentContainer>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createCircleSchema}
        submitTitle="Create"
      >
        {(formik) => (
          <View className="mb-2">
            <TextInput
              label="Circle name"
              {...formikToInputProps(formik, "name")}
            />
          </View>
        )}
      </Form>
    </ScreenContentContainer>
  );
};

export default CreateCircleScreen;
