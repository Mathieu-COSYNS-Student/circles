import React, { useId, type Dispatch, type PropsWithoutRef } from "react";
import { View } from "react-native";
import DefaultDropDownPicker, {
  type DropDownPickerProps as DefaultDropDownPickerProps,
  type ItemType,
  type ValueType,
} from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "~/hooks/Theme";
import ActivityIndicator from "./ActivityIndicator";
import { InputWrapper, type TextWrapperProps } from "./InputWrapper";

type SetStateCallback<S> = (prevState: S) => S;

interface DropDownPickerSingleProps<T> {
  multiple?: false;
  onChangeValue?: (value: T | null) => void;
  onSelectItem?: (item: ItemType<T>) => void;
  setValue: Dispatch<SetStateCallback<T | null>>;
  value: T | null;
}

interface DropDownPickerMultipleProps<T> {
  multiple: true;
  onChangeValue?: (value: T[] | null) => void;
  onSelectItem?: (items: ItemType<T>[]) => void;
  setValue: Dispatch<SetStateCallback<T[] | null>>;
  value: T[] | null;
}

export type DropDownPickerProps<T> = Pick<
  DefaultDropDownPickerProps<T>,
  | "items"
  | "open"
  | "placeholder"
  | "closeAfterSelecting"
  | "disabled"
  | "categorySelectable"
  | "searchable"
  | "searchPlaceholder"
  | "mode"
  | "itemSeparator"
  | "modalTitle"
  | "loading"
  | "min"
  | "max"
  | "setOpen"
  | "setItems"
  | "onPress"
  | "onOpen"
  | "onClose"
  | "onChangeSearchText"
  | "onDirectionChanged"
  | "disableLocalSearch"
  | "dropDownDirection"
  | "closeOnBackPressed"
  | "hideSelectedItemIcon"
  | "extendableBadgeContainer"
> &
  (DropDownPickerSingleProps<T> | DropDownPickerMultipleProps<T>) &
  Omit<TextWrapperProps, "labelId" | "children"> & {
    modal?: boolean;
  };

export const DropDownPicker = <T extends ValueType>({
  label,
  hint,
  touched,
  errors,
  containerClassName,
  modal,
  ...props
}: PropsWithoutRef<DropDownPickerProps<T>>) => {
  const labelId = useId();
  const { text, background, inputBorder, inputBackground, inputPlaceholder } =
    useThemeColors([
      "text",
      "background",
      "inputPlaceholder",
      "inputBackground",
      "inputBorder",
    ]);

  return (
    <View style={{ zIndex: 1, position: "relative" }}>
      <InputWrapper
        containerClassName={containerClassName}
        labelId={labelId}
        label={label}
        hint={hint}
        touched={touched}
        errors={errors}
      >
        <View style={{ zIndex: 2 }}>
          <DefaultDropDownPicker
            listMode={modal ? "MODAL" : "SCROLLVIEW"}
            ArrowDownIconComponent={() => {
              return (
                <Ionicons size={20} color={text} name="chevron-down-outline" />
              );
            }}
            ArrowUpIconComponent={() => {
              return (
                <Ionicons size={20} color={text} name="chevron-up-outline" />
              );
            }}
            TickIconComponent={() => {
              return (
                <Ionicons size={20} color={text} name="checkmark-outline" />
              );
            }}
            CloseIconComponent={() => {
              return <Ionicons size={30} color={text} name="close-outline" />;
            }}
            ActivityIndicatorComponent={({ size }) => (
              <ActivityIndicator size={size} />
            )}
            style={{
              borderColor: inputBorder,
              backgroundColor: inputBackground,
            }}
            labelStyle={{
              color: text,
            }}
            placeholderStyle={{
              color: inputPlaceholder,
            }}
            dropDownContainerStyle={{
              borderColor: inputBorder,
              backgroundColor: inputBackground,
            }}
            listItemLabelStyle={{
              color: text,
            }}
            selectedItemContainerStyle={{
              backgroundColor: "transparent",
            }}
            selectedItemLabelStyle={{
              fontWeight: "bold",
            }}
            modalContentContainerStyle={{
              backgroundColor: background,
            }}
            closeIconContainerStyle={{
              marginLeft: 4,
            }}
            itemSeparatorStyle={{
              backgroundColor: inputBorder,
            }}
            listMessageTextStyle={{
              color: text,
            }}
            {...props}
          />
        </View>
      </InputWrapper>
    </View>
  );
};
