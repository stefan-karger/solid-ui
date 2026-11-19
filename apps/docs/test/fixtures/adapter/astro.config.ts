import { fileURLToPath } from "node:url"

import solid from "@astrojs/solid-js"
import { defineConfig } from "astro/config"

export default defineConfig({
  // The fixture tests rendering and hydration without Astro's development overlay.
  devToolbar: { enabled: false },
  integrations: [solid()],
  vite: {
    optimizeDeps: { exclude: ["@ui-sdk/core"] },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("../../../src", import.meta.url)),
        "solid-js/web": "@solidjs/web",
        "lucide-solid": fileURLToPath(
          new URL(
            "../../../node_modules/lucide-solid/dist/source/lucide-solid.jsx",
            import.meta.url
          )
        )
      }
    }
  }
})
