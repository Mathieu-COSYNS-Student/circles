import { type FormikProps } from "formik";

export const formikToInputProps = <T extends object>(
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
    value: values[key],
    touched: touched[key],
    errors: errors[key],
  };
};
