// TODO: Add support for TS config files in Nativewind.

// import { type Config } from "tailwindcss";

// import baseConfig from "@acme/tailwind-config";

// export default {
//   presets: [baseConfig],
//   content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
// } satisfies Config;

const baseConfig = require("@acme/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  content: ["./src/**/*.{ts,tsx}"],
};
