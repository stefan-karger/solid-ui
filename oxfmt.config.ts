import { defineConfig } from "oxfmt"

export default defineConfig({
  astro: true,
  endOfLine: "lf",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  sortImports: true,
  sortPackageJson: {
    sortScripts: true
  },
  sortTailwindcss: {
    functions: ["clsx", "cva", "cn"],
    stylesheet: "./apps/docs/src/styles/global.css"
  },
  ignorePatterns: [
    "vendor/astro-solid/upstream/**",
    // Frozen v1 registry for solidui-cli 0.7, published byte for byte.
    "apps/docs/public/registry/**",
    "**/node_modules/**",
    "**/dist/**",
    "**/.astro/**",
    "**/.turbo/**",
    "**/coverage/**",
    "pnpm-lock.yaml"
  ]
})
