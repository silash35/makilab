module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ["node_modules", ".next"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": "error",
    "spaced-comment": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@next/next/no-img-element": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};