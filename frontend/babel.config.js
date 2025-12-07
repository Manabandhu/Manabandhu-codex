module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            '@manabandhu/ui': '../../packages/ui/src',
            '@manabandhu/utils': '../../packages/utils/src',
            '@manabandhu/types': '../../packages/types/src'
          }
        }
      ]
    ]
  };
};
