const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [""],
  theme: {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      gray: colors.gray,
      zinc: colors.zinc,
      red: colors.red,
      orange: colors.amber,
      green: colors.green,
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
  plugins: [],
};
