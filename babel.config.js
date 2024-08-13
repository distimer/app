module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".js", ".ts", ".tsx"],
        alias: {
          root: ["./"],
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
