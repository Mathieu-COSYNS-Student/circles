/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache.forever();

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      ["module-resolver", { alias: { "~": "./src", "~assets": "./assets" } }],
      ["react-native-reanimated/plugin", { relativeSourceLocation: true }],
    ],
  };
};
