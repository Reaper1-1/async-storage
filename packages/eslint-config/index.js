const config = require("@rnx-kit/eslint-plugin/recommended");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  ...config,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-console": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
