import { type FC } from "react";

import { updateCircleSchema, type UpdateCircleValues } from "@acme/schema";

import { formikToInputProps } from "~/utils/formikUtils";
import { trpc } from "~/utils/trpc";
import { ModalForm, TextInput } from "~/components/ui";

export interface ChangeCircleNameFormProps {
  visible: boolean;
  onRequestClose?: () => void;
  initialValues: UpdateCircleValues;
  showName?: boolean;
  // showPictureUrl?: boolean;
  afterSuccessfulSubmit?: () => void;
}

export const UpdateCircleNameForm: FC<ChangeCircleNameFormProps> = ({
  visible,
  onRequestClose,
  initialValues,
  showName = false,
  // showPictureUrl = false,
}) => {
  const schema = updateCircleSchema.required({
    name: showName || undefined,
  });

  const utils = trpc.useContext();
  const updateCircleMutation = trpc.circles.update.useMutation();

  const onSubmit = async (values: UpdateCircleValues) => {
    const result = await updateCircleMutation.mutateAsync(values);
    if (result) {
      utils.chats.getChatList.invalidate();
      utils.circles.get.invalidate();
    }
    onRequestClose?.();
  };

  return (
    <ModalForm
      visible={visible}
      onRequestClose={onRequestClose}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
      submitTitle="Change name"
    >
      {(formik) => (
        <>
          {showName && (
            <TextInput
              variant="modal"
              label="Enter a new name"
              {...formikToInputProps(formik, "name")}
            />
          )}
        </>
      )}
    </ModalForm>
  );
};
