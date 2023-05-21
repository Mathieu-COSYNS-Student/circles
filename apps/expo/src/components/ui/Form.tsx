import { useMemo, type ReactNode } from "react";
import { View } from "react-native";
import {
  Formik,
  type FormikConfig,
  type FormikProps,
  type FormikValues,
} from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { useThemeColor } from "~/hooks/Theme";
import Button from "./Button";
import Text from "./Text";

export type FormProps<
  SchemaOutput,
  Values extends FormikValues = FormikValues,
> = Omit<FormikConfig<Values>, "validationSchema"> & {
  validationSchema: z.ZodSchema<SchemaOutput>;
  submitTitle?: string;
  submitClassName?: string;
  submitComponent?: ReactNode | ((formik: FormikProps<Values>) => ReactNode);
};

const statusSchema = z.object({
  errors: z.string().min(1).or(z.array(z.string())),
});

const FormError = ({ error }: { error: string }) => {
  const errorColor = useThemeColor("error");

  return (
    <Text key="error" style={{ color: errorColor }} className="mt-2">
      {error}
    </Text>
  );
};

const FormErrors = <Values extends FormikValues = FormikValues>({
  formik,
}: {
  formik: FormikProps<Values>;
}) => {
  const errors = useMemo(() => {
    const statusSafeParse = statusSchema.safeParse(formik.status);

    if (!statusSafeParse.success) return null;

    const { errors } = statusSafeParse.data;

    return typeof errors === "string"
      ? errors
      : errors.filter((error) => error.length);
  }, [formik.status]);

  if (!errors) return <View className="mx-3 mb-4" />;

  return (
    <View className="mx-3 mb-3">
      {typeof errors === "string" ? (
        <FormError error={errors} />
      ) : (
        <>
          {errors.map((error) => (
            <FormError key={error} error={error} />
          ))}
        </>
      )}
    </View>
  );
};

export const Form = <SchemaOutput, Values extends FormikValues = FormikValues>({
  validationSchema,
  validate,
  children,
  submitTitle,
  submitClassName,
  submitComponent,
  ...props
}: FormProps<SchemaOutput, Values>) => {
  const handleValidate = (values: Values) => {
    return validate?.(values);
  };

  return (
    <Formik
      validationSchema={toFormikValidationSchema(validationSchema)}
      validate={handleValidate}
      {...props}
    >
      {(formik) => (
        <>
          {typeof children === "function" ? children(formik) : <>{children}</>}
          <View>
            <FormErrors formik={formik} />
            {submitComponent ? (
              <>
                {typeof submitComponent === "function" ? (
                  submitComponent(formik)
                ) : (
                  <>{submitComponent}</>
                )}
              </>
            ) : (
              <>
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
          </View>
        </>
      )}
    </Formik>
  );
};
