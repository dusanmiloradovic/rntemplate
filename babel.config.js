module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-react-native"],
    plugins: ["module:react-native-dotenv"],
  };
};
