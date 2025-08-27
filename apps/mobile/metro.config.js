const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Убираем проблемный transformer
config.transformer = {
  ...config.transformer,
  // babelTransformerPath: require.resolve('react-native-sass-transformer'), // УДАЛИТЬ ЭТУ СТРОКУ
};

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'scss', 'sass'],
};

module.exports = config;
