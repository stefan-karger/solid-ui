import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  platform: "node",
  // `target` is read from `engines.node` in package.json (node22.18).
  // Keep `dist/index.js` (the package is `"type": "module"`), which `bin` and `exports` point to.
  fixedExtension: false
})
