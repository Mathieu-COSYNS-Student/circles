module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks/',
            '@navigators': './src/navigators/',
            '@utils': './src/utils/',
            '@screens': './src/screens/',
          },
        },
      ],
    ],
  };
};
