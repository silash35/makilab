module.exports = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  semi: true,
  singleQuote: false,

  overrides: [
    {
      files: ["_document.js"],
      options: {
        printWidth: 200,
      },
    },
  ],
};
