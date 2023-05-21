import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { setIn, type FormikProps } from "formik";

type NoFunctionValue =
  | boolean
  | string
  | number
  | null
  | undefined
  | NoFunctionObject
  | NoFunctionArray;

interface NoFunctionObject {
  [key: string]: NoFunctionValue;
}

type NoFunctionArray = Array<NoFunctionValue>;

export const formikToInputProps = <
  T extends Record<string, NoFunctionValue> &
    (keyof T extends string ? object : "T must only have string keys"),
  Value,
>(
  {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setStatus,
    validateOnChange,
  }: Pick<
    FormikProps<T>,
    | "handleChange"
    | "handleBlur"
    | "values"
    | "touched"
    | "errors"
    | "setStatus"
    | "validateOnChange"
  >,
  key: keyof T,
) => {
  return {
    onChangeText: (e: string | ChangeEvent<never>) => {
      handleChange(key)(e);
      if (validateOnChange) setStatus(null);
    },
    onBlur: handleBlur(key),
    value: values[key] as Value,
    touched: touched[key],
    errors: errors[key],
  };
};

export const formikToDropdownProps = <
  T extends Record<string, NoFunctionValue> &
    (keyof T extends string ? object : "T must only have string keys"),
  // Value,
>(
  {
    setValues,
    setFieldValue,
    values,
    touched,
    errors,
    setStatus,
    validateOnChange,
  }: Pick<
    FormikProps<T>,
    | "setValues"
    | "setFieldValue"
    | "values"
    | "touched"
    | "errors"
    | "setStatus"
    | "validateOnChange"
  >,
  field: keyof T,
) => {
  if (values[field] === "function") throw new Error();

  const setFormikValue: Dispatch<SetStateAction<T[keyof T] | null>> = (
    value,
  ) => {
    if (typeof value === "function") {
      setValues((values) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return setIn(values, field as string, value(values[field]));
      });
    } else {
      setFieldValue(field as string, value);
    }
    if (validateOnChange) setStatus(null);
  };

  return {
    setValue: setFormikValue,
    value: values[field], //as Value,
    touched: touched[field],
    errors: errors[field],
  };
};
