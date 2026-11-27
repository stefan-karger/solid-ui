/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url"

import { getViteConfig } from "astro/config"

export default getViteConfig(
  {
    // Vitest runs from the repository root, outside the docs tsconfig paths.
    resolve: {
      alias: { "~": fileURLToPath(new URL("./src", import.meta.url)) }
    },
    test: {
      // A cached transform keeps a stale import.meta.glob file list.
      fsModuleCache: false,
      name: "astro-render",
      environment: "node",
      // registry.server prepares sources against the theme stylesheet.
      css: { include: [/style-nova\.css/] },
      include: [
        "src/components/docs/**/*.render.test.ts",
        "src/lib/registry.server.test.ts"
      ],
      exclude: ["**/node_modules/**", "**/dist/**"]
    }
  },
  {
    root: fileURLToPath(new URL("./", import.meta.url))
  }
)
