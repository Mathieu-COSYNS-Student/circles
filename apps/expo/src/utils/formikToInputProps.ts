import { type FormikProps } from "formik";

export const formikToInputProps = <T extends Record<string, unknown>, Value>(
  {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  }: Pick<
    FormikProps<T>,
    "handleChange" | "handleBlur" | "values" | "touched" | "errors"
  >,
  key: keyof T,
) => {
  return {
    onChangeText: handleChange(key),
    onBlur: handleBlur(key),
    value: values[key] as Value,
    touched: touched[key],
    errors: errors[key],
  };
};
