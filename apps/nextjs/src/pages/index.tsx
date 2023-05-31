import Image from "next/image";

const IndexPage = () => {
  return (
    <>
      <section className="hero py-8 before:bg-brand-600 before:dark:bg-brand-900 lg:py-16">
        <div>
          <h2 className="text-6xl font-semibold">
            Stay connected and organized with Circles
          </h2>
          <p className="my-4 text-xl">
            Circles helps you to stay in touch with your friends, family and
            caregivers. With Circles you can chat, ask for help, manage
            appointments and easily care for your loved ones.
          </p>
          <a
            href="#"
            className={`my-6 inline-block rounded-lg border border-white bg-white px-4
            py-2 text-center text-sm font-medium text-brand-700
            hover:border-brand-800 hover:bg-brand-800 hover:text-white
            focus:outline-none focus:ring-4 focus:ring-brand-300
            dark:border-white dark:text-brand-600 dark:hover:border-brand-700 dark:hover:bg-brand-700
            dark:focus:ring-brand-400`}
          >
            Download Circles
          </a>
        </div>
        <div className="relative w-full">
          <Image
            className="object-contain drop-shadow-[0_16px_25px_rgba(0,0,0,0.3)] filter dark:drop-shadow-[0_16px_25px_rgba(255,255,255,0.1)]"
            src="/circles.png"
            alt="circle-logo"
            fill={true}
          />
        </div>
      </section>
      <svg
        className="text-brand-600 dark:text-brand-900"
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m1440 0v20C1302.4 9.1 1164.8 1.7 985 10 805.2 18.3 583.2 42.3 412 46c-171.2 3.7-291.6-12.9-412-29.5v-16.5z"
          stroke="none"
          strokeWidth="0"
          fill="currentColor"
          fillOpacity="1"
        ></path>
      </svg>
    </>
  );
};

export default IndexPage;
