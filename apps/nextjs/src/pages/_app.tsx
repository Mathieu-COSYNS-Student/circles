import "../styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import { ClerkProvider, UserButton, useUser } from "@clerk/nextjs";

import { OpenOutline } from "~/components/OpenOutline";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="border-b border-gray-200 bg-white dark:border-zinc-900 dark:bg-zinc-900 dark:shadow-sm dark:shadow-zinc-700">
      <nav className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center">
          <Image
            className="mr-3"
            src="/Circles_logo_round.svg"
            alt="circle-logo"
            width={48}
            height={48}
          />
          <span className="whitespace-nowrap text-2xl font-semibold dark:text-white">
            Circles
          </span>
        </a>
        <div className="flex md:order-2">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <a
                href="/sign-in"
                className={`mr-2 rounded-lg border border-brand-700 px-4 py-2
        text-center text-sm font-medium text-brand-700
        hover:border-brand-800 hover:bg-brand-800 hover:text-white
        focus:outline-none focus:ring-4 focus:ring-brand-300
        dark:border-brand-600 dark:text-brand-600 dark:hover:border-brand-700 dark:hover:bg-brand-700
        dark:focus:ring-brand-400`}
              >
                Sign in
              </a>
              <a
                href="/sign-up"
                className={`rounded-lg border border-brand-700 bg-brand-700 px-4 py-2
        text-center text-sm font-medium text-white
        hover:border-brand-800 hover:bg-brand-800 hover:text-white
        focus:outline-none focus:ring-4 focus:ring-brand-300
        dark:bg-brand-600 dark:hover:border-brand-700 dark:hover:bg-brand-700
        dark:focus:ring-brand-400`}
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="mx-auto max-w-screen-xl px-6 pb-12 pt-8 text-center">
      <p>Project made by Mathieu Cosyns and Brandon Ngoran Ntam</p>
      <p>
        Source code can be found on{" "}
        <a
          className="font-medium text-brand-600 hover:underline dark:text-brand-400"
          href="https://github.com/Mathieu-COSYNS-Student/circles"
          target="_blank"
        >
          Github{" "}
          <span className="inline-block h-4 w-4 pt-[1px]">
            <OpenOutline />
          </span>
        </a>
      </p>
    </footer>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Header />

      <main className="flex-grow">
        <Component {...pageProps} />
      </main>

      <Footer />
    </ClerkProvider>
  );
}

export default MyApp;
