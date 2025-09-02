const config = require("@rnx-kit/eslint-plugin/recommended");

module.exports = [
  ...config,
  {
    rules: {
      "no-console": "error",
    },
  },
];
