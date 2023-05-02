// TODO: Add support for TS config files in Nativewind.

// import { type Config } from "tailwindcss";

// import baseConfig from "@acme/tailwind-config";

// export default {
//   presets: [baseConfig],
//   content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
// } satisfies Config;

const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F1F0FF",
          100: "#E7E6FE",
          200: "#CAC8FE",
          300: "#B2B0FD",
          400: "#9A97FC",
          500: "#7D79FB",
          600: "#6560FB",
          700: "#4B44FA",
          800: "#0C06D1",
          900: "#060368",
          950: "#030132",
        },
      },
    },
  },
  content: ["./src/**/*.{ts,tsx}"],
};

module.exports = config;
