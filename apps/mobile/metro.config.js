// apps/mobile/metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-sass-transformer'),
};

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'scss', 'sass'],
};

module.exports = config;
