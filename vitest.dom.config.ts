import { fileURLToPath } from "node:url"

import solid from "@solidjs/vite-plugin"
import { defineProject } from "vitest/config"

export default defineProject({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./apps/docs/src", import.meta.url))
    }
  },
  plugins: [
    solid({
      refresh: false,
      ssr: false
    })
  ],
  ssr: {
    resolve: {
      conditions: ["browser", "development"]
    }
  },
  test: {
    // Transforms persist between runs. The one test whose subject uses
    // import.meta.glob runs in the uncached astro-render project instead.
    name: "dom",
    // `pnpm validate` runs the suite beside the builds and type checks.
    testTimeout: 15_000,
    environment: "happy-dom",
    setupFiles: ["./tests/setup-dom.ts"],
    css: {
      include: [/style-nova\.css/]
    },
    include: ["apps/**/*.test.{ts,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/*.render.test.ts",
      "**/registry.server.test.ts"
    ],
    server: {
      deps: {
        // Keep UI SDK and the tests on the same Solid instance.
        inline: [
          "@astrojs/solid-js",
          "@astrojs/solid-js-renderer",
          "solid-js",
          "@solidjs/web",
          "@solidjs/signals",
          "@ui-sdk/solid",
          "@ui-sdk/core",
          /[/\\]@solid-primitives[/\\]/
        ]
      }
    }
  }
})
