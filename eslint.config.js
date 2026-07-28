import js from "@eslint/js";
import globals from "globals";

export default {
  ignores: ["dist", ".output", ".vinxi"],
  extends: [js.configs.recommended, "plugin:prettier/recommended"],
  files: ["**/*.{js,jsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: ["react-hooks", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "server-only",
            message:
              "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
          },
        ],
      },
    ],
    "no-unused-vars": "off",
  },
};
