import { SignIn, UserButton } from "@clerk/nextjs";

const ResetPassword = () => {
  return (
    <div>
      <p>This is the circles website. There is nothing here use the app!</p>
      <SignIn />
      <UserButton />
    </div>
  );
};

export default ResetPassword;
