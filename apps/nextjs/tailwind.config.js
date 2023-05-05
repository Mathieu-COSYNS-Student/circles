const baseConfig = require("@acme/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  content: ["./src/**/*.{ts,tsx}"],
};
