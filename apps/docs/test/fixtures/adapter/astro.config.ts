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
      // The fixture renders the docs' registry examples from outside the docs root.
      alias: { "~": fileURLToPath(new URL("../../../src", import.meta.url)) }
    }
  }
})
