import { fileURLToPath } from "node:url"

import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { rehypePrettyCode } from "rehype-pretty-code"

import { rehypeCommandMetadata } from "./src/lib/command-metadata"
import {
  DARK_CODE_THEME,
  LIGHT_CODE_THEME,
  transformers
} from "./src/lib/highlight-code"

export default defineConfig({
  output: "static",
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
    syntaxHighlight: false
  },
  vite: {
    optimizeDeps: { exclude: ["@ui-sdk/core"] },
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: "solid-js/web", replacement: "@solidjs/web" },
        {
          find: /^lucide-solid$/,
          replacement: fileURLToPath(
            new URL(
              "./node_modules/lucide-solid/dist/source/lucide-solid.jsx",
              import.meta.url
            )
          )
        },
        {
          find: "~",
          replacement: fileURLToPath(new URL("./src", import.meta.url))
        }
      ]
    }
  }
})
