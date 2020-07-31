const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.resolve.alias["WebView"] = "react-native-web-webview";
  config.module.rules = [
    ...config.module.rules,
    {
      test: /postMock.html$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    }
  ];

  return config;
};
