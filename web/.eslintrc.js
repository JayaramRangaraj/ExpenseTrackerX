module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential", // or vue2-essential if using Vue 2
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false, // 👈 This line fixes the Babel config detection issue
  },
  rules: {
    // Optional custom rules
  },
};
