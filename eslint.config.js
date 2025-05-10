import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true,
      },
    },
    rules: {
      // ここにルール追加可能
    },
  },
  // ✅ Flat Config 用の React 推奨設定
  pluginReact.configs.flat.recommended,
]);

