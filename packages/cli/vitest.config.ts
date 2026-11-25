import { fileURLToPath } from "node:url"

import { defineProject } from "vitest/config"

export default defineProject({
  resolve: {
    alias: { "~": fileURLToPath(new URL("./src", import.meta.url)) }
  },
  test: {
    name: "cli",
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Run as if started with npx, whatever runs the tests; tests that need
    // another tool stub it.
    env: { npm_config_user_agent: "npm/11.6.2 node/v24.13.0 win32 x64" }
  }
})
