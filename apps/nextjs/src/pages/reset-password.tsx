import { useState, type FC } from "react";
import { type GetStaticProps } from "next";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from "@acme/schema";

export const getStaticProps: GetStaticProps = () => {
  return {
    notFound: true,
  };
};

// // eslint-disable-next-line @typescript-eslint/require-await
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

const ResetPasswordPage: FC = () => {
  const [signInError, setSignInError] = useState<string | undefined>();
  const { user } = useUser();

  const removeSignInError = () => {
    setSignInError(undefined);
  };

  const initialValues: ResetPasswordFormSchema = {
    newPassword: "",
    confirmNewPassword: "",
    signOutOfOtherSessions: false,
  };

  const onSubmit = async (values: ResetPasswordFormSchema) => {
    console.log("submit");
    try {
      await user?.updatePassword({
        newPassword: values.newPassword,
        signOutOfOtherSessions: values.signOutOfOtherSessions,
      });
    } catch (err) {
      setSignInError(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        err && Object.hasOwn(err, "errors") ? err.errors[0].message : err,
      );
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center p-6">
      <div className="m-2 w-11/12 max-w-lg rounded-lg border border-[#ebebff] bg-brand-50 p-8 dark:border-zinc-900 dark:bg-zinc-800">
        {user ? (
          <>
            <div className="mb-8 flex items-center">
              <Image
                src="/Circles_logo_round.svg"
                width={60}
                height={60}
                alt="Circles logo"
              />
              <h1 className="ml-4">Reset your password</h1>
            </div>
            <p>
              Hi <span className="font-semibold">{user.fullName}</span>,
            </p>
            <p>
              You are here because you wish to change your password on Circles
            </p>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={toFormikValidationSchema(
                resetPasswordFormSchema,
              )}
              validate={removeSignInError}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mt-6">
                    <label htmlFor="newPassword" className="mb-2 ml-2">
                      New password
                    </label>
                    <Field
                      className={`flex w-full flex-row items-center overflow-hidden rounded-lg border
             border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 
             focus:border-brand-500 focus:ring-brand-500 
             dark:border-zinc-800 dark:bg-zinc-900 dark:text-white 
             dark:focus:border-brand-500 dark:focus:ring-brand-500`}
                      name="newPassword"
                      type="password"
                      placeholder="Your new Password"
                    />
                    <div className="mx-3 mb-2 mt-1 text-sm text-red-500">
                      <ErrorMessage
                        name="newPassword"
                        className="mx-3 mb-2 mt-1 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="confirmNewPassword" className="mb-2 ml-2">
                      Confirm new password
                    </label>
                    <Field
                      className={`flex w-full flex-row items-center overflow-hidden rounded-lg border
             border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 
             focus:border-brand-500 focus:ring-brand-500 
             dark:border-zinc-800 dark:bg-zinc-900 dark:text-white 
             dark:focus:border-brand-500 dark:focus:ring-brand-500`}
                      name="confirmNewPassword"
                      type="password"
                      placeholder="Your new Password"
                    />
                    <div className="mx-3 mb-2 mt-1 text-sm text-red-500">
                      <ErrorMessage name="confirmNewPassword" />
                    </div>
                  </div>
                  <p className="mx-3 mb-4 mt-1 text-sm text-red-500">
                    {signInError}
                  </p>

                  <button
                    className={`flex w-full flex-row justify-center rounded-lg bg-brand-600 px-4 py-3
              font-semibold uppercase text-white
            hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-300
            dark:bg-brand-600 dark:hover:bg-brand-500 dark:focus:ring-zinc-500`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "..." : "Reset password"}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
