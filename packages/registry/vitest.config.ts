import { defineProject } from "vitest/config"

export default defineProject({
  test: {
    name: "registry",
    environment: "node",
    include: ["src/**/*.test.ts"]
  }
})
