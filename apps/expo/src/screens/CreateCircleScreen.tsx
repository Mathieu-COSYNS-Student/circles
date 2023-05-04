import React from "react";
import { View } from "react-native";
import { Formik } from "formik";

import { trpc } from "~/utils/trpc";
import { Button, TextInput } from "~/components/ui";

interface FormValues {
  name: string;
}

const CreateCircleScreen = () => {
  const createNewCircleMutation = trpc.circles.create.useMutation();

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 5000));
    await createNewCircleMutation.mutateAsync(values);
  };

  const initialValues: FormValues = { name: "" };

  return (
    <View className="p-2">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <View>
            <TextInput
              className="mb-2"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              label="Circle name"
            />

            <Button disabled={isSubmitting} onPress={() => handleSubmit()}>
              {isSubmitting ? "..." : "Create"}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateCircleScreen;