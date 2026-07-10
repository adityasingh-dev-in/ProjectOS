import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
    ignores: ["dist", "node_modules", ".turbo"],
  },
);
