import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="mt-8 flex justify-center">
      <SignIn />
    </section>
  );
}
