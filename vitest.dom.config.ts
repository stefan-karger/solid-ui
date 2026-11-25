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
    // Persistent transforms retain stale import.meta.glob file lists after ports.
    fsModuleCache: false,
    name: "dom",
    environment: "happy-dom",
    setupFiles: ["./tests/setup-dom.ts"],
    css: {
      include: [/style-nova\.css/]
    },
    include: ["apps/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/*.render.test.ts"],
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
