import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { rehypePrettyCode } from "rehype-pretty-code"
import lucidePreprocess from "vite-plugin-lucide-preprocess"

import { rehypeCommandMetadata } from "./src/lib/command-metadata"
import {
  DARK_CODE_THEME,
  LIGHT_CODE_THEME,
  transformers
} from "./src/lib/highlight-code"

export default defineConfig({
  site: "https://www.solid-ui.com",
  integrations: [mdx(), solid()],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: { dark: DARK_CODE_THEME, light: LIGHT_CODE_THEME },
            transformers
          }
        ],
        rehypeCommandMetadata
      ]
    }),
    // rehype-pretty-code highlights code blocks instead of Astro's Shiki.
    syntaxHighlight: false
  },
  vite: {
    // UI SDK installation guide: pre-bundling core would load a second copy.
    optimizeDeps: { exclude: ["@ui-sdk/core"] },
    // Solid packages skip prebundling, so `import { XIcon } from "@lucide/solid"`
    // would load every icon module in development; the plugin imports each
    // one. After MDX compiles, so code samples in the docs stay as written.
    plugins: [{ ...lucidePreprocess(), enforce: "post" }, tailwindcss()]
  }
})
