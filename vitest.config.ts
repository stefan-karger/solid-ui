import solid from "vite-plugin-solid"
import { defineConfig } from "vitest/config"

export default defineConfig({
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
    environment: "happy-dom",
    include: ["apps/**/*.test.{ts,tsx}", "packages/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    server: {
      deps: {
        inline: ["solid-js", "@solidjs/web", "@solidjs/signals"]
      }
    }
  }
})
