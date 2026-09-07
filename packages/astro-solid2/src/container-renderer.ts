import type { AstroRenderer } from "astro"

export function getContainerRenderer(): AstroRenderer {
  return {
    name: "@astrojs/solid-js",
    clientEntrypoint: "@solid-ui/astro-solid2/client.js",
    serverEntrypoint: "@solid-ui/astro-solid2/server.js"
  }
}
