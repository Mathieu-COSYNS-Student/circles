import { type FC } from "react";
import {
  Modal as DefaultModal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ModalProps as DefaultModalProps,
} from "react-native";

import Button, { type ButtonProps } from "./Button";

type PrimaryButton = {
  primaryButtonText?: string;
  primaryButtonProps?: Omit<ButtonProps, "title">;
};

type SecondaryButton = {
  secondaryButtonText?: string;
  secondaryButtonProps?: Omit<ButtonProps, "title">;
};

export type ModalButtonsProps = {
  onRequestClose?: () => void;
} & PrimaryButton &
  SecondaryButton;

export const ModalButtons: FC<ModalButtonsProps> = ({
  primaryButtonText,
  primaryButtonProps,
  secondaryButtonText,
  secondaryButtonProps,
  onRequestClose,
}) => {
  const usePrimaryButton = typeof primaryButtonText === "string";
  const useSecondaryButton = typeof secondaryButtonText === "string";

  return (
    <View className="mt-6 w-full flex-row justify-end ">
      {useSecondaryButton && (
        <View className={usePrimaryButton ? "mr-1" : ""}>
          <Button
            variant="normal-outline"
            title={secondaryButtonText}
            onPress={onRequestClose}
            {...secondaryButtonProps}
          />
        </View>
      )}
      {usePrimaryButton && (
        <Button
          title={primaryButtonText}
          onPress={onRequestClose}
          {...primaryButtonProps}
        />
      )}
    </View>
  );
};

export type ModalProps = Omit<DefaultModalProps, "onRequestClose"> & {
  shortWidth?: boolean;
  onRequestClose?: () => void;
};

export const Modal: FC<ModalProps> = ({
  shortWidth = false,
  onRequestClose,
  children,
  ...props
}) => (
  <DefaultModal
    animationType="slide"
    transparent={true}
    onRequestClose={onRequestClose}
    {...props}
  >
    <TouchableOpacity
      className={`h-full ${shortWidth ? " items-center" : ""}`}
      activeOpacity={1}
      onPressOut={onRequestClose}
    >
      <ScrollView
        directionalLockEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback>
          <View
            className={`m-4 rounded-3xl bg-gray-50 p-6 shadow-xl shadow-gray-600
                  dark:bg-zinc-700 dark:shadow-zinc-400`}
            style={{ elevation: 5 }}
          >
            <View className="items-center">{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </TouchableOpacity>
  </DefaultModal>
);
