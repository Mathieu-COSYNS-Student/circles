import { type FormikValues } from "formik";

import { Form, type FormProps } from "./Form";
import { Modal, ModalButtons, type ModalProps } from "./Modal";

export type ModalFormProps<
  SchemaOutput,
  Values extends FormikValues = FormikValues,
> = FormProps<SchemaOutput, Values> &
  Pick<ModalProps, "visible" | "onRequestClose">;

export const ModalForm = <
  SchemaOutput,
  Values extends FormikValues = FormikValues,
>({
  visible,
  onRequestClose,
  submitTitle,
  children,
  ...props
}: ModalFormProps<SchemaOutput, Values>) => {
  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <Form {...props}>
        {(formik) => (
          <>
            {typeof children === "function" ? (
              children(formik)
            ) : (
              <>{children}</>
            )}
            <ModalButtons
              primaryButtonText={submitTitle}
              primaryButtonProps={{
                isLoading: formik.isSubmitting,
                onPress: () => formik.handleSubmit(),
              }}
              secondaryButtonText="Cancel"
              onRequestClose={onRequestClose}
            />
          </>
        )}
      </Form>
    </Modal>
  );
};
