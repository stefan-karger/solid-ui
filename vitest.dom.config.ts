import { fileURLToPath } from "node:url"

import solid from "vite-plugin-solid"
import { defineProject } from "vitest/config"

export default defineProject({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./apps/docs/src", import.meta.url))
    }
  },
  plugins: [
    solid({
      hot: false,
      ssr: false
    })
  ],
  ssr: {
    resolve: {
      conditions: ["browser", "development"]
    }
  },
  test: {
    name: "dom",
    environment: "happy-dom",
    css: {
      include: [/style-nova\.css/]
    },
    include: ["apps/**/*.test.{ts,tsx}", "packages/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/*.render.test.ts"],
    server: {
      deps: {
        inline: ["solid-js", "@solidjs/web", "@solidjs/signals"]
      }
    }
  }
})
