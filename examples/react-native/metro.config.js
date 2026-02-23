const { makeMetroConfig } = require("@rnx-kit/metro-config");
const { getPlatformResolver } = require("@callstack/out-of-tree-platforms");

module.exports = makeMetroConfig({
  resolver: {
    resolveRequest: getPlatformResolver({
      platformNameMap: { visionos: "@callstack/react-native-visionos" },
    }),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
