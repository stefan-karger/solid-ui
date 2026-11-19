/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url"

import { getViteConfig } from "astro/config"

export default getViteConfig(
  {
    test: {
      // Each project owns its cache setting; the registry glob must stay current.
      fsModuleCache: false,
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
