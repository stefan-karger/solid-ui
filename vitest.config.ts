import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    projects: ["./vitest.dom.config.ts", "./apps/docs/vitest.astro.config.ts"]
  }
})
