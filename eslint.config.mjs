import js from "@eslint/js"
import vitest from "@vitest/eslint-plugin"
import astro from "eslint-plugin-astro"
import solid from "eslint-plugin-solid"
import { defineConfig, globalIgnores } from "eslint/config"
import ts from "typescript-eslint"

export default defineConfig(
  globalIgnores([
    "docs/",
    "vendor/astro-solid/upstream/**",
    "**/node_modules/**",
    "**/dist/**",
    "**/.astro/**",
    "**/.turbo/**",
    "**/coverage/**"
  ]),
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"],
    extends: [js.configs.recommended, ts.configs.recommended]
  },
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.tsx"],
    extends: [solid.configs.v2]
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    extends: [vitest.configs.recommended]
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  }
)
