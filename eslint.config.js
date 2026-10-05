// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

/**
 * Global ESLint 9 configuration.
 *
 * WHY:
 * `ignores` declared as a standalone first object applies globally across all configs in ESLint flat format.
 * Prevents ESLint from inspecting build artifacts, auto-generated files, and reference example code.
 */
module.exports = defineConfig([
  {
    ignores: [
      "dist/**",
      "example/**",
      ".expo/**",
      "node_modules/**",
      "web-build/**",
    ],
  },
  expoConfig,
]);
