import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node, // Node.js globals
        ...globals.es2021,
      },
    },
    rules: {
      // add any custom rules
    },
    ignores: ["dist", "node_modules"],
  },
];
