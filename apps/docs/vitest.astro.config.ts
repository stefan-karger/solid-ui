/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url"

import { getViteConfig } from "astro/config"

export default getViteConfig(
  {
    test: {
      name: "astro-render",
      environment: "node",
      include: ["src/components/docs/**/*.render.test.ts"],
      exclude: ["**/node_modules/**", "**/dist/**"]
    }
  },
  {
    root: fileURLToPath(new URL("./", import.meta.url))
  }
)
