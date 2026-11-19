import { defineConfig } from "oxfmt"

export default defineConfig({
  astro: true,
  endOfLine: "lf",
  printWidth: 100,
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
    "vendor/shadcn/**",
    "vendor/astro-solid/upstream/**",
    "**/node_modules/**",
    "**/dist/**",
    "**/.astro/**",
    "**/.turbo/**",
    "**/coverage/**",
    "pnpm-lock.yaml"
  ]
})
