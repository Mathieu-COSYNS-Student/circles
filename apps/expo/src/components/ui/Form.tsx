import { View } from "react-native";
import { Formik, type FormikConfig, type FormikValues } from "formik";
import { type z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import Button from "./Button";

export type FormProps<
  SchemaOutput,
  Values extends FormikValues = FormikValues,
> = Omit<FormikConfig<Values>, "validationSchema"> & {
  validationSchema: z.ZodSchema<SchemaOutput>;
  submitTitle?: string;
  submitClassName?: string;
};

export const Form = <SchemaOutput, Values extends FormikValues = FormikValues>({
  validationSchema,
  children,
  submitTitle,
  submitClassName,
  ...props
}: FormProps<SchemaOutput, Values>) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(validationSchema)}
      {...props}
    >
      {(formik) => (
        <>
          {typeof children === "function" ? children(formik) : <>{children}</>}
          {submitTitle && (
            <View className={submitClassName}>
              <Button
                isLoading={formik.isSubmitting}
                onPress={() => formik.handleSubmit()}
                title={submitTitle}
              />
            </View>
          )}
        </>
      )}
    </Formik>
  );
};
